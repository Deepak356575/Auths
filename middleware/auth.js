const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Authentication required. Please login.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      username: decoded.username
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid session' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired' });
    }
    
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth;
