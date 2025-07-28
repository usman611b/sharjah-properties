const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Check if admin exists
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. Admin not found.' 
      });
    }

    // Add admin info to request
    req.admin = {
      id: admin._id,
      email: admin.email
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please login again.' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error.' 
    });
  }
};

module.exports = authMiddleware; 