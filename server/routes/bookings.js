const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const Payment = require('../models/Payment');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create Booking
router.post('/', auth, async (req, res) => {
    try {
        const { carId, startDate, endDate, totalAmount, paymentMethod, pickupLocation, dropoffLocation } = req.body;
        
        // Check if car exists
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Create booking
        const booking = new Booking({
            user: req.user._id,
            car: carId,
            startDate,
            endDate,
            totalAmount,
            paidAmount: paymentMethod === 'cash_on_return' ? 0 : totalAmount,
            status: paymentMethod === 'cash_on_return' ? 'confirmed' : 'active',
            paymentStatus: paymentMethod === 'cash_on_return' ? 'pending' : 'full_paid',
            paymentMethod: paymentMethod === 'cash_on_return' ? 'cash_on_return' : 'card',
            pickupLocation,
            dropoffLocation
        });

        await booking.save();

        // Create payment record if not cash on return
        if (paymentMethod !== 'cash_on_return') {
            const payment = new Payment({
                booking: booking._id,
                user: req.user._id,
                amount: totalAmount,
                type: 'full_payment',
                method: paymentMethod === 'card' ? 'card' : 'card',
                transactionId: 'TXN' + Date.now(),
                status: 'success'
            });
            await payment.save();
        }

        // Update user statistics
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { 
                totalBookings: 1,
                totalSpent: paymentMethod === 'cash_on_return' ? 0 : totalAmount,
                loyaltyPoints: Math.floor(totalAmount / 10)
            }
        });

        // Populate car details
        await booking.populate('car');

        res.status(201).json(booking);
    } catch (err) {
        console.error('Create booking error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get User Bookings
router.get('/my', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('car')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All Bookings (Admin only)
router.get('/all', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('car', 'name brand model')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Single Booking
router.get('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id }).populate('car');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mark booking as paid (for cash on return)
router.post('/:id/mark-paid', auth, async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.paymentStatus === 'full_paid') {
            return res.status(400).json({ message: 'Booking already paid' });
        }

        // Update booking
        booking.paymentStatus = 'full_paid';
        booking.paidAmount = booking.totalAmount;
        booking.status = 'active';
        await booking.save();

        // Create payment record
        const payment = new Payment({
            booking: booking._id,
            user: req.user._id,
            amount: booking.totalAmount,
            type: 'full_payment',
            method: 'cash',
            status: 'success',
            notes: 'Cash payment marked as paid by user'
        });
        await payment.save();

        // Update user statistics
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { 
                totalSpent: booking.totalAmount
            }
        });

        await booking.populate('car');
        res.json({ message: 'Booking marked as paid', booking });
    } catch (err) {
        console.error('Mark paid error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Pay for booking (online payment after cash on return booking)
router.post('/:id/pay', auth, async (req, res) => {
    try {
        const { paymentMethod } = req.body;
        const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.paymentStatus === 'full_paid') {
            return res.status(400).json({ message: 'Booking already paid' });
        }

        // Update booking
        booking.paymentStatus = 'full_paid';
        booking.paidAmount = booking.totalAmount;
        booking.paymentMethod = 'card';
        booking.status = 'active';
        await booking.save();

        // Create payment record
        const payment = new Payment({
            booking: booking._id,
            user: req.user._id,
            amount: booking.totalAmount,
            type: 'full_payment',
            method: 'card',
            transactionId: 'TXN' + Date.now(),
            status: 'success'
        });
        await payment.save();

        // Update user statistics
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { 
                totalSpent: booking.totalAmount
            }
        });

        await booking.populate('car');
        res.json({ message: 'Payment successful', booking, payment });
    } catch (err) {
        console.error('Payment error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
