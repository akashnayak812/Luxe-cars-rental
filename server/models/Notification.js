const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['booking_update', 'payment_success', 'promo', 'system'] },
    isRead: { type: Boolean, default: false },
    link: { type: String }, // Action URL (e.g. /bookings/123)
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
