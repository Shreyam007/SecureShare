const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 4000, // Timeout after 4 seconds if DB is unreachable
      connectTimeoutMS: 4000          // Timeout connection after 4 seconds
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Backend server will continue running. A database fallback mock store will handle requests if MongoDB is offline.');
  }
};

module.exports = connectDB;
