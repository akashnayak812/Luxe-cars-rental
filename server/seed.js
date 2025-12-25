const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Car = require('./models/Car');
const Booking = require('./models/Booking');
const Payment = require('./models/Payment');
const bcrypt = require('bcryptjs');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        // Clear existing data (optional - comment out if you want to keep existing data)
        await Car.deleteMany({});
        await Booking.deleteMany({});
        await Payment.deleteMany({});
        console.log('Cleared existing data');

        // Create sample cars
        const cars = await Car.insertMany([
            {
                name: 'Tesla Model S Plaid',
                model: 'Model S',
                brand: 'Tesla',
                type: 'EV',
                pricePerDay: 189,
                images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop'],
                seats: 5,
                transmission: 'Automatic',
                fuelType: 'Electric',
                features: ['Autopilot', 'Premium Sound', 'Glass Roof'],
                isAvailable: true,
                licensePlate: 'TES-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                location: {
                    address: 'San Francisco, CA'
                }
            },
            {
                name: 'Porsche 911 GT3',
                model: '911 GT3',
                brand: 'Porsche',
                type: 'Convertible',
                pricePerDay: 349,
                images: ['https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=800&auto=format&fit=crop'],
                seats: 2,
                transmission: 'Manual',
                fuelType: 'Petrol',
                features: ['Sport Mode', 'Racing Seats', 'Carbon Fiber'],
                isAvailable: true,
                licensePlate: 'POR-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                location: {
                    address: 'Los Angeles, CA'
                }
            },
            {
                name: 'Mercedes-Benz S-Class',
                model: 'S-Class',
                brand: 'Mercedes-Benz',
                type: 'Luxury',
                pricePerDay: 299,
                images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop'],
                seats: 5,
                transmission: 'Automatic',
                fuelType: 'Hybrid',
                features: ['Massage Seats', 'Night Vision', 'Executive Rear Seats'],
                isAvailable: true,
                licensePlate: 'MER-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                location: {
                    address: 'New York, NY'
                }
            }
        ]);

        console.log('Sample cars created');

        // Find a user or create a demo user
        let user = await User.findOne({ email: 'john@example.com' });
        
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            
            user = await User.create({
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                phone: '+1-555-0123',
                role: 'user',
                profileImage: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff',
                licenseNumber: 'DL1234567890',
                licenseExpiry: new Date('2026-12-31'),
                licenseState: 'CA',
                address: {
                    street: '123 Main St',
                    city: 'San Francisco',
                    state: 'CA',
                    zip: '94105',
                    country: 'USA'
                },
                totalBookings: 0,
                totalSpent: 0,
                loyaltyPoints: 100,
                accountStatus: 'active'
            });
            console.log('Demo user created');
        }

        // Create sample bookings
        const bookings = [];
        const payments = [];

        // Active booking
        const activeBooking = await Booking.create({
            user: user._id,
            car: cars[0]._id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            totalAmount: 567,
            paidAmount: 567,
            status: 'active',
            paymentStatus: 'full_paid',
            paymentMethod: 'card',
            pickupLocation: 'San Francisco Airport',
            dropoffLocation: 'San Francisco Airport'
        });
        bookings.push(activeBooking);

        // Payment for active booking
        payments.push(await Payment.create({
            booking: activeBooking._id,
            user: user._id,
            amount: 567,
            type: 'full_payment',
            method: 'card',
            transactionId: 'TXN' + Date.now(),
            status: 'success'
        }));

        // Completed booking 1
        const completedBooking1 = await Booking.create({
            user: user._id,
            car: cars[1]._id,
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            endDate: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000), // 26 days ago
            totalAmount: 1396,
            paidAmount: 1396,
            status: 'completed',
            paymentStatus: 'full_paid',
            paymentMethod: 'card',
            pickupLocation: 'Los Angeles Downtown',
            dropoffLocation: 'Los Angeles Airport'
        });
        bookings.push(completedBooking1);

        payments.push(await Payment.create({
            booking: completedBooking1._id,
            user: user._id,
            amount: 1396,
            type: 'full_payment',
            method: 'card',
            transactionId: 'TXN' + (Date.now() - 1000000),
            status: 'success'
        }));

        // Completed booking 2
        const completedBooking2 = await Booking.create({
            user: user._id,
            car: cars[2]._id,
            startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
            endDate: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000), // 58 days ago
            totalAmount: 598,
            paidAmount: 598,
            status: 'completed',
            paymentStatus: 'full_paid',
            paymentMethod: 'card',
            pickupLocation: 'New York JFK Airport',
            dropoffLocation: 'New York Manhattan'
        });
        bookings.push(completedBooking2);

        payments.push(await Payment.create({
            booking: completedBooking2._id,
            user: user._id,
            amount: 598,
            type: 'full_payment',
            method: 'card',
            transactionId: 'TXN' + (Date.now() - 2000000),
            status: 'success'
        }));

        // Update user statistics
        await User.findByIdAndUpdate(user._id, {
            totalBookings: bookings.length,
            totalSpent: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
            loyaltyPoints: Math.floor(bookings.reduce((sum, b) => sum + b.totalAmount, 0) / 10)
        });

        console.log('Sample bookings and payments created');
        console.log(`
✅ Seed data created successfully!

Demo User Credentials:
Email: john@example.com
Password: password123

Summary:
- ${cars.length} cars created
- ${bookings.length} bookings created (1 active, 2 completed)
- ${payments.length} payments created
- User statistics updated

You can now login and see the full profile with booking and payment history!
        `);

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedData();
