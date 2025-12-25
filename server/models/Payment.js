const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['advance', 'full_payment', 'balance_payment', 'refund'], required: true },
    method: { type: String, enum: ['card', 'cash', 'transfer'], required: true },
    transactionId: { type: String }, // External Gateway ID
    status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success' },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
