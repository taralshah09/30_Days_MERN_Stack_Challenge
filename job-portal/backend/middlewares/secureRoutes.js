import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
configDotenv();

export const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ message: "User not authorized, no cookie provided!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid token!" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in secure-route:", error);
    return res
      .status(500)
      .json({ message: "Error in secure route: " + error.message });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ message: "User not authorized, no cookie provided!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid token!" });
    }

    const admin = await User.findById(decoded.userId);

    if (!admin) {
      return res.status(404).json({ message: "No user found!" });
    }

    const isAdmin = admin.role === "admin";
    if (isAdmin) {
      next();
    }
    return res
      .status(400)
      .json({ message: "Not authorised to view this page!" });
  } catch (error) {
    console.log("Error in secure-route:", error);
    return res
      .status(500)
      .json({ message: "Error in secure route: " + error.message });
  }
};
