import mongoose from "mongoose";

import { env } from "./env.js";

let hasAttemptedConnection = false;
let hasSeededConnectionMessage = false;

export async function connectDatabase() {
  if (!env.mongodbUri) {
    if (!hasSeededConnectionMessage) {
      console.warn(
        "MONGODB_URI is not configured. Shria will run with demo catalog data until MongoDB is connected.",
      );
      hasSeededConnectionMessage = true;
    }

    return false;
  }

  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (hasAttemptedConnection && mongoose.connection.readyState !== 0) {
    return mongoose.connection.readyState === 1;
  }

  hasAttemptedConnection = true;

  try {
    await mongoose.connect(env.mongodbUri);
    console.log("MongoDB connected for Shria.");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed. Falling back to demo mode.", error.message);
    return false;
  }
}

export function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

