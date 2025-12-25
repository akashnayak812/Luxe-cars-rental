const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    licenseNumber: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleType: { type: String },
    isAvailable: { type: Boolean, default: true },
    currentLocation: {
        lat: { type: Number },
        lng: { type: Number }
    },
    rating: { type: Number, default: 5.0 },
    earnings: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
