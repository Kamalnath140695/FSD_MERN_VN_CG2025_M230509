const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller/SellerSchema');
const Book = require('../models/Seller/BookSchema');
const Order = require('../models/Users/MyOrders');

const sellerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const seller = new Seller({ name, email, password: hashedPassword });
    await seller.save();
    
    res.status(201).json({ message: 'Seller registered. Awaiting admin approval.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });
    
    if (!seller || !await bcrypt.compare(password, seller.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (!seller.isApproved) {
      return res.status(403).json({ message: 'Account not approved by admin' });
    }
    
    const token = jwt.sign({ id: seller._id, role: 'seller' }, process.env.JWT_SECRET);
    res.json({ token, seller: { id: seller._id, name: seller.name, email: seller.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, genre, description, price, quantity, imageUrl } = req.body;
    
    // Get seller information
    const seller = await Seller.findById(req.user.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    
    let itemImage = null;
    if (req.file) {
      itemImage = `http://localhost:8000/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      itemImage = imageUrl;
    }
    
    const book = new Book({
      title,
      author,
      genre,
      description,
      price,
      sellerId: req.user.id,
      sellerName: seller.name,
      inventory: { quantity: quantity || 1, location: 'Warehouse' },
      itemImage
    });
    
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ sellerId: req.user.id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.findOneAndDelete({ _id: req.params.id, sellerId: req.user.id });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    console.log('Seller ID:', req.user.id);
    
    // Get all orders to debug
    const allOrders = await Order.find({});
    console.log('Total orders in database:', allOrders.length);
    
    if (allOrders.length > 0) {
      console.log('Sample order structure:', JSON.stringify(allOrders[0], null, 2));
    }
    
    // Find orders that contain items from this seller
    const orders = await Order.find({ 'items.sellerId': req.user.id })
      .populate('userId', 'name email')
      .populate('items.bookId', 'title author itemImage');
    
    console.log('Orders matching seller ID:', orders.length);
    
    if (orders.length === 0) {
      // Try alternative query - maybe sellerId is stored as string
      const ordersAlt = await Order.find({ 'items.sellerId': req.user.id.toString() })
        .populate('userId', 'name email')
        .populate('items.bookId', 'title author itemImage');
      console.log('Orders matching seller ID as string:', ordersAlt.length);
      
      // Return all orders for debugging (remove this in production)
      const debugOrders = await Order.find({})
        .populate('userId', 'name email')
        .populate('items.bookId', 'title author itemImage');
      
      return res.json(debugOrders);
    }
    
    // Filter items to only include those belonging to this seller
    const filteredOrders = orders.map(order => ({
      ...order.toObject(),
      items: order.items.filter(item => item.sellerId.toString() === req.user.id)
    })).filter(order => order.items.length > 0);
    
    res.json(filteredOrders);
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  sellerRegister, 
  sellerLogin, 
  addBook, 
  getMyBooks, 
  updateBook, 
  deleteBook, 
  getOrders 
};