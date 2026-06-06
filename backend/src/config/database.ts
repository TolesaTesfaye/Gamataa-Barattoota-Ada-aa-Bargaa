import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/gbaabw";

    await mongoose.connect(mongoUri);

    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error);
    // Don't exit — allow server to start without DB so Railway can show logs
    console.log(
      "⚠ Server will start but database features will be unavailable",
    );
  }
};

export default connectDB;
