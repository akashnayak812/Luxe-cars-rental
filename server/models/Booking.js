const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }, // Optional
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 }, // Amount paid so far
    status: { type: String, enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending', 'partial_paid', 'full_paid', 'failed'], default: 'pending' },
    paymentMethod: { type: String, enum: ['card', 'cash_on_return', 'other'], default: 'card' },
    paymentId: { type: String }, // Stripe/Razorpay ID for initial payment
    pickupLocation: { type: String },
    dropoffLocation: { type: String },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
