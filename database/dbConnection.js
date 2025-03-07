// database/dbConnection.js
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || 'mongodb+srv://hosni:iYMqRnHl8jG9USE3@plumbing.sttlj.mongodb.net/?retryWrites=true&w=majority&appName=plumbing');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = { dbConnection };