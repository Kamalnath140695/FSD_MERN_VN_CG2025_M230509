const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    interactionType: { type: String, enum: ['view', 'purchase', 'review'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Interaction', interactionSchema);