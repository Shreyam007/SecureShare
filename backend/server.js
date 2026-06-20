const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');

// Load environment variables
dotenv.config();

// Auto-generate secure file encryption key if missing in .env
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

if (!process.env.FILE_ENCRYPTION_KEY) {
  const generatedKey = crypto.randomBytes(32).toString('hex');
  if (process.env.VERCEL) {
    process.env.FILE_ENCRYPTION_KEY = generatedKey;
    console.log('Secure file encryption key generated in memory (Vercel).');
  } else {
    const envPath = path.join(__dirname, '.env');
    // Read existing file to see if it has a newline at the end
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    const prefix = envContent.endsWith('\n') ? '' : '\n';
    fs.appendFileSync(envPath, `${prefix}FILE_ENCRYPTION_KEY=${generatedKey}\n`);
    process.env.FILE_ENCRYPTION_KEY = generatedKey;
    console.log('Secure file encryption key generated and appended to .env file.');
  }
}

// Ensure secure uploads directory exists
const uploadsDir = process.env.VERCEL 
  ? '/tmp' 
  : path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created secure uploads directory.');
}

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev simplicity, can refine for prod
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SecureShare API' });
});
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to SecureShare API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'An internal server error occurred' });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
