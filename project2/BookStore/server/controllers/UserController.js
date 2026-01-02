const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users/UserSchema');
const Book = require('../models/Seller/BookSchema');
const Order = require('../models/Users/MyOrders');
const Wishlist = require('../models/Users/WishlistSchema');
const Interaction = require('../models/Interaction');

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const { category, author, search } = req.query;
    let filter = {};
    
    if (category) filter.genre = new RegExp(category, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { author: new RegExp(search, 'i') },
        { genre: new RegExp(search, 'i') }
      ];
    }
    
    const books = await Book.find(filter).populate('sellerId', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;
    const user = await User.findById(req.user.id);
    
    const existingItem = user.cart.find(item => item.bookId.toString() === bookId);
    if (existingItem) {
      existingItem.quantity += quantity;
      // Remove item if quantity becomes 0 or negative
      if (existingItem.quantity <= 0) {
        user.cart = user.cart.filter(item => item.bookId.toString() !== bookId);
      }
    } else if (quantity > 0) {
      user.cart.push({ bookId, quantity });
    }
    
    await user.save();
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;
    const user = await User.findById(req.user.id);
    
    user.cart = user.cart.filter(item => item.bookId.toString() !== bookId);
    await user.save();
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const user = await User.findById(req.user.id);
    
    const existingItem = user.cart.find(item => item.bookId.toString() === bookId);
    if (existingItem) {
      if (quantity <= 0) {
        user.cart = user.cart.filter(item => item.bookId.toString() !== bookId);
      } else {
        existingItem.quantity = quantity;
      }
      await user.save();
      res.json({ message: 'Cart updated successfully' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.bookId');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    let totalAmount = 0;
    const orderItems = [];
    
    console.log('Creating order with items:', items);
    
    for (let item of items) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res.status(404).json({ message: `Book with ID ${item.bookId} not found` });
      }
      
      console.log('Book found:', { id: book._id, title: book.title, sellerId: book.sellerId });
      
      totalAmount += book.price * item.quantity;
      
      orderItems.push({
        bookId: item.bookId,
        sellerId: book.sellerId, // Get sellerId from the book
        quantity: item.quantity,
        price: book.price,
        title: book.title,
        author: book.author
      });
    }
    
    console.log('Order items to save:', orderItems);
    
    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress
    });
    
    await order.save();
    console.log('Order saved:', order);
    
    // Clear cart
    await User.findByIdAndUpdate(req.user.id, { cart: [] });
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.bookId', 'title author price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;
    const existingItem = await Wishlist.findOne({ userId: req.user.id, bookId });
    
    if (existingItem) {
      return res.status(400).json({ message: 'Book already in wishlist' });
    }
    
    const wishlistItem = new Wishlist({ userId: req.user.id, bookId });
    await wishlistItem.save();
    
    res.json({ message: 'Book added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.id })
      .populate('bookId', 'title author price itemImage genre');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;
    await Wishlist.findOneAndDelete({ userId: req.user.id, bookId });
    res.json({ message: 'Book removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  userRegister, 
  userLogin, 
  getBooks, 
  addToCart, 
  removeFromCart,
  updateCartQuantity,
  getCart, 
  createOrder, 
  getMyOrders,
  addToWishlist,
  getWishlist,
  removeFromWishlist
};