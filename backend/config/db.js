const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGO_URL || process.env.DATABASE_URL;

    if (!mongoURI) {
      console.error("Error: MongoDB URI is missing. Make sure to set MONGO_URI, MONGO_URL, or DATABASE_URL environment variables.");
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
