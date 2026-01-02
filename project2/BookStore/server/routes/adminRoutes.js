const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { 
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
} = require('../controllers/AdminControllers');

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.get('/pending-sellers', authMiddleware(['admin']), getPendingSellers);
router.put('/approve-seller/:sellerId', authMiddleware(['admin']), approveSeller);
router.get('/books', authMiddleware(['admin']), getAllBooks);
router.get('/users', authMiddleware(['admin']), getAllUsers);
router.put('/user/:userId', authMiddleware(['admin']), updateUser);
router.delete('/user/:userId', authMiddleware(['admin']), deleteUser);
router.get('/user/:userId/orders', authMiddleware(['admin']), getUserOrders);
router.get('/sellers', authMiddleware(['admin']), getAllSellers);
router.put('/seller/:sellerId', authMiddleware(['admin']), updateSeller);
router.delete('/seller/:sellerId', authMiddleware(['admin']), deleteSeller);
router.get('/seller/:sellerId/books', authMiddleware(['admin']), getSellerBooks);
router.get('/orders', authMiddleware(['admin']), getAllOrders);

module.exports = router;