const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profileImage: { type: String, default: 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff' },
    isVerified: { type: Boolean, default: false },
    pushToken: { type: String },
    
    // Professional Details
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    
    // License Information
    licenseNumber: { type: String },
    licenseExpiry: { type: Date },
    licenseState: { type: String },
    
    // Address
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    
    // Rental Statistics
    totalBookings: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    memberSince: { type: Date, default: Date.now },
    loyaltyPoints: { type: Number, default: 0 },
    
    // Preferences
    preferences: {
        favoriteCarTypes: [String],
        preferredLocations: [String],
        insurancePreference: { type: String, enum: ['basic', 'standard', 'premium'], default: 'basic' }
    },
    
    // Account Status
    accountStatus: { type: String, enum: ['active', 'suspended', 'pending_verification'], default: 'active' },
    verificationDocuments: [{
        type: String,
        url: String,
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        uploadedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
