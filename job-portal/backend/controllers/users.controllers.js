import { createAndSaveToken } from "../jwt/auth.jwt.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    createAndSaveToken(newUser._id, res);

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong, unable to register new user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      createAndSaveToken(user._id, res);

      return res.status(200).json({
        message: "User logged in successfully",
        user,
      });
    }

    return res.status(401).json({ message: "Incorrect Password!" });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    return res
      .status(500)
      .json({
        message: "Something went wrong during login",
        error: error.message,
      });
  }
};

export const updateUserProfile = async (req, res) => {
  const userId = req.user._id; // Retrieved from authUser middleware

  const updateFields = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};
