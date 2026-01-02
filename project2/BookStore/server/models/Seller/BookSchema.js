const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    itemImage: String,
    description: String,
    price: { type: Number, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
    sellerName: String,
    inventory: {
        quantity: { type: Number, default: 0 },
        location: { type: String, default: 'Warehouse' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);