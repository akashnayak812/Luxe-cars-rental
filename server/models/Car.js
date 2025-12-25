const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true }, // e.g., Toyota, Tesla
    model: { type: String, required: true }, // e.g., Camry, Model S
    year: { type: Number, required: true },
    type: { type: String, enum: ['SUV', 'Sedan', 'Luxury', 'EV', 'Convertible', 'sedan', 'suv', 'sports', 'luxury'], required: true },
    pricePerDay: { type: Number, required: true },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'petrol', 'diesel', 'electric', 'hybrid'], required: true },
    transmission: { type: String, enum: ['Automatic', 'Manual', 'automatic', 'manual'], required: true },
    seats: { type: Number, required: true },
    image: { type: String, required: true }, // Main image URL
    images: [{ type: String }], // Additional images
    features: [{ type: String }], // e.g., ["GPS", "Bluetooth", "Sunroof"]
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    totalTrips: { type: Number, default: 0 },
    available: { type: Boolean, default: true }, // Using 'available' to match frontend
    isAvailable: { type: Boolean, default: true }, // Keeping for backward compatibility
    licensePlate: { type: String, unique: true },
    mileage: { type: Number, required: true },
    color: { type: String, required: true },
    location: {
        lat: { type: Number },
        lng: { type: Number },
        address: { type: String }
    }
}, { timestamps: true });

// Pre-save middleware to sync available and isAvailable fields
carSchema.pre('save', function(next) {
    if (this.isModified('available')) {
        this.isAvailable = this.available;
    } else if (this.isModified('isAvailable')) {
        this.available = this.isAvailable;
    }
    next();
});

module.exports = mongoose.model('Car', carSchema);
