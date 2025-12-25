const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        // Bearer <token>
        const tokenPart = token.split(' ')[1];
        if (!tokenPart) return res.status(401).json({ message: 'Access denied. Invalid token format.' });

        const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET || 'secretKey');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;
