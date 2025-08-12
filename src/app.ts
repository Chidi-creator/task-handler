import mongoose from "mongoose";
import { connDb } from "database/db";
import { redisConfig } from "./config";
import middleware from "./middleware";
import "./engine/workers/email.workers"; // Initialize email worker

connDb();

mongoose.connection.once("open", () => {
  redisConfig;
  console.log("🌐 Starting server on port 3050...");
  middleware.getApp().listen(3050, () => {
    console.log(" Server is running on http://localhost:3050");
  });
});



