const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const mongoose = require('mongoose');
const memoryStore = require('../config/memoryStore');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretsecuresharekey123!';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '135623497828-ffmbq9r8g32hhbi9jo44q97ganv29n5a.apps.googleusercontent.com';

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // In-memory fallback
    if (mongoose.connection.readyState !== 1) {
      const emailLower = email.toLowerCase();
      const userExists = memoryStore.users.find(u => u.email === emailLower);
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const mockId = `mock-user-${Date.now()}`;
      const newUser = {
        _id: mockId,
        name,
        email: emailLower,
        passwordHash: bcrypt.hashSync(password, 10),
        createdAt: new Date()
      };
      memoryStore.users.push(newUser);

      return res.status(201).json({
        success: true,
        token: generateToken(mockId),
        user: {
          id: mockId,
          name,
          email: emailLower,
        },
      });
    }

    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // In-memory fallback
    if (mongoose.connection.readyState !== 1) {
      const emailLower = email.toLowerCase();
      const user = memoryStore.users.find(u => u.email === emailLower);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const isMatch = bcrypt.compareSync(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      return res.status(200).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }

    // Check user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if user has password set (might be a Google-only user initially)
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: 'This account was created via Google OAuth. Please sign in with Google or reset your password.',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again' });
  }
});

// @route   POST /api/auth/google
// @desc    Google OAuth verification & login/register
// @access  Public
router.post('/google', async (req, res) => {
  try {
    const { token, mock } = req.body;

    if (!token && !mock) {
      return res.status(400).json({ success: false, message: 'No credential token provided' });
    }

    let email, name, googleId, avatar;

    // Handle Mock Authentication Flow (fallback for offline/dev test environments)
    if (mock) {
      email = mock.email;
      name = mock.name;
      googleId = mock.googleId || `mock-google-id-${Date.now()}`;
      avatar = mock.avatar || '';
    } else {
      // Validate Google Token using official client library
      const client = new OAuth2Client(GOOGLE_CLIENT_ID);
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        email = payload.email;
        name = payload.name;
        googleId = payload.sub;
        avatar = payload.picture;
      } catch (tokenErr) {
        console.error('Google ID token verification failed:', tokenErr.message);
        return res.status(400).json({
          success: false,
          message: 'Google login failed due to invalid token. Please check your credentials or run in mock mode.',
        });
      }
    }

    // In-memory fallback
    if (mongoose.connection.readyState !== 1) {
      const emailLower = email.toLowerCase();
      let user = memoryStore.users.find(u => u.googleId === googleId);

      if (!user) {
        user = memoryStore.users.find(u => u.email === emailLower);
        if (user) {
          user.googleId = googleId;
          if (!user.avatar) user.avatar = avatar;
        } else {
          user = {
            _id: `mock-user-${Date.now()}`,
            name,
            email: emailLower,
            googleId,
            avatar,
            createdAt: new Date()
          };
          memoryStore.users.push(user);
        }
      }

      return res.status(200).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    }

    // Check if user exists with googleId
    let user = await User.findOne({ googleId });

    if (!user) {
      // If not, check if user exists with email (link Google ID to email)
      user = await User.findOne({ email });

      if (user) {
        // Link googleId to existing email account
        user.googleId = googleId;
        if (!user.avatar) user.avatar = avatar;
        await user.save();
      } else {
        // Create new user (Google only initially)
        user = await User.create({
          name,
          email,
          googleId,
          avatar,
        });
      }
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Google auth route error:', error);
    res.status(500).json({ success: false, message: 'Google OAuth processing failed' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user details
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
});

module.exports = router;
