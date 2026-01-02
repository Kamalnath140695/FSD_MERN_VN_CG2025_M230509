const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { 
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
} = require('../controllers/UserController');

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/books', getBooks);
router.post('/cart', authMiddleware(['user']), addToCart);
router.get('/cart', authMiddleware(['user']), getCart);
router.delete('/cart/:bookId', authMiddleware(['user']), removeFromCart);
router.put('/cart', authMiddleware(['user']), updateCartQuantity);
router.post('/orders', authMiddleware(['user']), createOrder);
router.get('/orders', authMiddleware(['user']), getMyOrders);
router.post('/wishlist', authMiddleware(['user']), addToWishlist);
router.get('/wishlist', authMiddleware(['user']), getWishlist);
router.delete('/wishlist/:bookId', authMiddleware(['user']), removeFromWishlist);

module.exports = router;