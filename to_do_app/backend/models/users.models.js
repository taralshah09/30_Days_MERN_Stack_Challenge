import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // Check if the password field is modified
    return next();
  }
  const salt = await bcrypt.genSalt(10); // Correct usage with await
  this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
  next();
});

export const User = mongoose.model("User", userSchema);
