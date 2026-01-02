const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connect.js');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8000'],
  credentials: true
}));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/user', userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});