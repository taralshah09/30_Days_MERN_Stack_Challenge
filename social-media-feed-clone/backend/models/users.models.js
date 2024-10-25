import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true, // Ensure googleId is unique
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // Ensure email is unique
    required :true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
