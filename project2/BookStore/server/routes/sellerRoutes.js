const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/authMiddleware');
const { 
  sellerRegister, 
  sellerLogin, 
  addBook, 
  getMyBooks, 
  updateBook, 
  deleteBook, 
  getOrders 
} = require('../controllers/SellerControllers');

router.post('/register', sellerRegister);
router.post('/login', sellerLogin);
router.post('/books', authMiddleware(['seller']), upload.single('itemImage'), addBook);
router.get('/books', authMiddleware(['seller']), getMyBooks);
router.put('/books/:id', authMiddleware(['seller']), updateBook);
router.delete('/books/:id', authMiddleware(['seller']), deleteBook);
router.get('/orders', authMiddleware(['seller']), getOrders);

module.exports = router;