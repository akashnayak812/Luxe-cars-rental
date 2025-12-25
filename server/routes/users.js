const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const bcrypt = require('bcryptjs');

// Get current user profile with complete details
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        
        // Get user's bookings with car details (including cash_on_return bookings)
        const bookings = await Booking.find({ user: req.user._id })
            .populate('car', 'name model images pricePerDay brand')
            .populate('driver', 'name phone rating')
            .sort({ createdAt: -1 });
        
        // Get user's payments with booking and car details
        const payments = await Payment.find({ user: req.user._id })
            .populate({
                path: 'booking',
                populate: {
                    path: 'car',
                    select: 'name model brand'
                }
            })
            .sort({ createdAt: -1 });
        
        // Calculate statistics
        const stats = {
            totalBookings: await Booking.countDocuments({ user: req.user._id }),
            activeBookings: await Booking.countDocuments({ user: req.user._id, status: 'active' }),
            completedBookings: await Booking.countDocuments({ user: req.user._id, status: 'completed' }),
            totalSpent: await Payment.aggregate([
                { $match: { user: req.user._id, status: 'success' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]).then(result => result[0]?.total || 0)
        };
        
        res.json({
            user,
            bookings,
            payments,
            stats
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
    try {
        const updates = req.body;
        
        // Don't allow updating sensitive fields directly
        delete updates.password;
        delete updates.role;
        delete updates.email;
        delete updates.totalBookings;
        delete updates.totalSpent;
        
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');
        
        res.json(user);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Get user's bookings
router.get('/bookings', auth, async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        
        const query = { user: req.user._id };
        if (status) query.status = status;
        
        const bookings = await Booking.find(query)
            .populate('car', 'name model images pricePerDay brand category')
            .populate('driver', 'name phone rating')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        
        const total = await Booking.countDocuments(query);
        
        res.json({
            bookings,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Get user's payment history
router.get('/payments', auth, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        
        const payments = await Payment.find({ user: req.user._id })
            .populate({
                path: 'booking',
                populate: { path: 'car', select: 'name model brand' }
            })
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        
        const total = await Payment.countDocuments({ user: req.user._id });
        
        // Calculate payment statistics
        const paymentStats = await Payment.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    total: { $sum: '$amount' }
                }
            }
        ]);
        
        res.json({
            payments,
            stats: paymentStats,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get payments error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Update user password
router.put('/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        const user = await User.findById(req.user._id);
        
        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Admin: Get all users (Admin only)
router.get('/all', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Get all admins (Admin only)
router.get('/admins', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const admins = await User.find({ role: 'admin' }).select('-password').sort({ createdAt: -1 });
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Create new admin (Admin only)
router.post('/create-admin', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { name, email, password, phone } = req.body;

        // Check if admin already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin user
        const admin = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: 'admin',
            isVerified: true,
            accountStatus: 'active'
        });

        await admin.save();

        res.status(201).json({ 
            message: 'Admin created successfully',
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (err) {
        console.error('Create admin error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Admin: Delete admin (Admin only)
router.delete('/admin/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Prevent deleting self
        if (req.user._id.toString() === req.params.id) {
            return res.status(400).json({ message: 'Cannot delete your own admin account' });
        }

        const admin = await User.findOneAndDelete({ _id: req.params.id, role: 'admin' });
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
