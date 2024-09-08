import express from "express";
import mongoose from "mongoose";
import { User } from "../models/users.models.js";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id , name : user.name }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "15m",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id , name : user.name}, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "7d",
  });
};

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });

    if (!user) {
      return res.status(400).json({ message: "Unable to create the user!" });
    }
    res.status(200).json({ message: "User created successfully", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, unable to create user!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ message: "Incorrect password!" });
    }
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: false, // Ensure this is false for local testing
        sameSite: "lax", // Consider setting this based on your requirements
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({ message: "User logged in", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, unable to log user in!" });
  }
});


// LOGOUT from the server
router.post("/logout",(req,res)=>{
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  res.status(200).json({message:"Logged out successfully!"})
})

export { router };
