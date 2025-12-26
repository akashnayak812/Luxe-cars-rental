const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration for Production
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://localhost:3000',
        process.env.FRONTEND_URL,
        /\.vercel\.app$/,  // Allow all Vercel preview deployments
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/', (req, res) => {
    res.json({ 
        message: 'Car Rental API is running',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-rental', {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
