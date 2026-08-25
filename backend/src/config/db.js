const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/shopsphere";
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDb };
