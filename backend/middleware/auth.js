const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretsecuresharekey123!';

const protect = async (req, res, next) => {
  let token;

  // Check for Token in Authorization Header (Bearer Token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Handle Mock Authentication Flow directly
      if (token.startsWith('mock-token')) {
        const isGoogle = token.includes('google');
        const mockId = isGoogle ? 'mock-google-id' : 'mock-saml-id';
        const mockName = isGoogle ? 'Google User' : 'Enterprise User';
        const mockEmail = isGoogle ? 'googleuser@example.com' : 'enterprise@company.com';
        
        req.user = { _id: mockId, name: mockName, email: mockEmail };
        return next();
      }

      // Verify normal token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from the token
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState !== 1) {
        const memoryStore = require('../config/memoryStore');
        const memoryUser = memoryStore.users.find(u => u._id === decoded.id);
        if (memoryUser) {
          req.user = { _id: memoryUser._id, name: memoryUser.name, email: memoryUser.email };
        }
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
