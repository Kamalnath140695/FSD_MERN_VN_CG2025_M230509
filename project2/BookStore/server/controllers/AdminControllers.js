const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin/AdminSchema');
const Seller = require('../models/Seller/SellerSchema');
const Book = require('../models/Seller/BookSchema');
const User = require('../models/Users/UserSchema');
const Order = require('../models/Users/MyOrders');

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin || !await bcrypt.compare(password, admin.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET);
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({ isApproved: false });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    await Seller.findByIdAndUpdate(sellerId, { isApproved: true });
    res.json({ message: 'Seller approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('sellerId', 'name email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().select('-password');
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { name, email } = req.body;
    const seller = await Seller.findByIdAndUpdate(sellerId, { name, email }, { new: true }).select('-password');
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    await Seller.findByIdAndDelete(sellerId);
    res.json({ message: 'Seller deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate('items.bookId', 'title author itemImage');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerBooks = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const books = await Book.find({ sellerId }).populate('sellerId', 'name email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  adminRegister,
  adminLogin, 
  getPendingSellers, 
  approveSeller, 
  getAllBooks,
  getAllUsers,
  getAllSellers,
  getAllOrders,
  updateSeller,
  deleteSeller,
  updateUser,
  deleteUser,
  getUserOrders,
  getSellerBooks
};