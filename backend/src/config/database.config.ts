import mongoose from "mongoose";
import { config } from "./app.config";

const connectDatabase = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("MONGO_URI:", config.MONGO_URI ? "✓ Present" : "✗ Missing");

    await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: "majority",
    });

    console.log("✓ Connected to Mongo database");
  } catch (error: any) {
    console.error("✗ Error connecting to Mongo database:");
    console.error("Error Message:", error.message);
    console.error("Error Code:", error.code);

    // Don't exit immediately - let the server run even without DB
    // This helps with debugging
    console.warn("⚠ Server running without database connection");
    // process.exit(1);
  }
};

export default connectDatabase;
