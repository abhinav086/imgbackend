import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,  // Automatically trims whitespace
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // Converts email to lowercase
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
});
export const User = mongoose.model("User",userSchema);