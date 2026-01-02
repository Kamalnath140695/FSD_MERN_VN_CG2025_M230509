const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        title: String,
        author: String
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },
    shippingAddress: {
        flatno: String,
        city: String,
        state: String,
        pincode: String
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            return date;
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);