const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const auth = require('../middleware/auth');

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a car (Admin only)
router.post('/', auth, async (req, res) => {
    console.log('POST /api/cars - Received request');
    console.log('User:', req.user);
    console.log('Request body:', req.body);
    
    if (req.user.role !== 'admin') {
        console.log('Access denied: User is not admin');
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    try {
        const car = new Car(req.body);
        const newCar = await car.save();
        console.log('Car created successfully:', newCar._id);
        res.status(201).json(newCar);
    } catch (err) {
        console.error('Error creating car:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Update a car (Admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a car (Admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
