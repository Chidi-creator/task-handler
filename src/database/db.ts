import mongoose from "mongoose";
import { env } from "@config/env.config";

export const connDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};
