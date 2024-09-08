import express from "express";
import { UsersModel as Users } from "../models/users.models.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
import bcrypt from "bcryptjs";

const router = express.Router();

// REGISTER -> POST /users/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await Users.create({ name, email, password });

    return res
      .status(200)
      .json({ message: "User registered successfully!", user: user });
  } catch (error) {
    console.error("Error during user registration:", error);

    return res
      .status(500)
      .json({ message: "Something went wrong, user not created!" });
  }
});

// LOGIN -> POST /users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not registered..." });
    }

    const isCorrect = bcrypt.compare(user.password, password);

    if (!isCorrect) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const payload = { id: user._id, name: user.name };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "3d",
    });
    return res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(200)
      .json({ message: "User logged in successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong , user not created!" });
  }
});

export { router };
