import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const connectToDatabase = async () => {
  try {
    if(mongoose.connections && mongoose.connections[0].readyState){
      console.log("Using existing database connection");
      return;
    } 
    // Connect to MongoDB using Mongoose
    const { connection } = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "nextAuth", // Specify the database name
    });

    console.log(`Connected to database: ${connection.host}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Error connecting to database");
  }
}