const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }, // Verified purchase
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    isApproved: { type: Boolean, default: true }, // Auto-approve
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
