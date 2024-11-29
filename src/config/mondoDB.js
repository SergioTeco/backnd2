const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/e-commerce");
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = { connectMongoDB };
