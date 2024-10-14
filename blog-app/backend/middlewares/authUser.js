import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";

configDotenv();
// Authentication Middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Middleware : ", token);

    if (!token) {
      return res.status(400).json({ message: "User not authenticated" }); // Ensure response sent once
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Send response and stop here
    }

    req.user = user;
    next(); // Proceed only if no response was sent
  } catch (error) {
    console.error("Authentication Error: ", error);
    res.status(401).json({ error: "User is not authenticated!" }); // Send one response
  }
};

// Authorization Middleware
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `User with role ${req.user.role} not allowed` }); // Stop further execution
    }
    console.log("isAdmin under operation");
    next(); // Call only if no response was sent
  };
};
