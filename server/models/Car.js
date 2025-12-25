const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true }, // e.g., Toyota, Tesla
    model: { type: String, required: true }, // e.g., Camry, Model S
    type: { type: String, enum: ['SUV', 'Sedan', 'Luxury', 'EV', 'Convertible'], required: true },
    pricePerDay: { type: Number, required: true },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
    transmission: { type: String, enum: ['Automatic', 'Manual'], required: true },
    seats: { type: Number, required: true },
    images: [{ type: String }],
    features: [{ type: String }], // e.g., ["GPS", "Bluetooth", "Sunroof"]
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    totalTrips: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    licensePlate: { type: String, unique: true, select: false },
    location: {
        lat: { type: Number },
        lng: { type: Number },
        address: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
