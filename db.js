import mongoose from "mongoose";

const dbconnection = async (MONGO_URI) => {
  try {
    if (!MONGO_URI) {
      throw new Error("Mongo URI is not provided");
    }

    // Connect to the database without deprecated options
    await mongoose.connect(MONGO_URI);

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);  // Exit process if there's a connection error
  }
};

export default dbconnection;
