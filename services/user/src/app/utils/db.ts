import mongoose from "mongoose";
import config from "../../config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("✅ MongoDB Connected for Product Service");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
