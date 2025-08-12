import mongoose from "mongoose";
import { connDb } from "database/mongo";
import { redisConfig } from "./config";
import middleware from "./middleware";
import setUpWorkers from "./engine";
import onDBConnected from "database/onDBConnected";

// Connect to database
connDb();

// Set up workers using Promise approach instead of top-level await
setUpWorkers().catch((error) => {
  console.log(error);
});

mongoose.connection.once("open", () => {
  redisConfig;
  onDBConnected()
  console.log("🌐 Starting server on port 3050...");
  middleware.getApp().listen(3050, () => {
    console.log(" Server is running on http://localhost:3050");
  });
});
