const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    logout, 
    getUserProfile 
} = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes 
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

//Auth middleware
router.use(auth); 

// Protected routes 
router.get('/profile', getUserProfile);
router.get('/test', (req, res) => {
    res.json({ 
        success: true,
        message: 'Protected route accessed successfully',
        user: {
            id: req.user.userId,
            email: req.user.email,
            username: req.user.username
        }
    });
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error('Route error:', err);
    res.status(500).json({ 
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = router;
