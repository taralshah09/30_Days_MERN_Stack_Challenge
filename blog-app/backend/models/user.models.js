import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    photo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    education: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    token:{
      type:String,
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
