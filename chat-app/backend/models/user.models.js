import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
        type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
