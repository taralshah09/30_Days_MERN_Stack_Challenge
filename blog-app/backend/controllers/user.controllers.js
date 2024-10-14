import { User } from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/authToken.js";

export const register = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { photo } = req.files;
    const allowedFormats = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Avatar is supposed to be in jpg or png format only!",
      });
    }

    const { name, email, password, phone, education, role } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !education ||
      !role ||
      !photo
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const uploadResult = await cloudinary.uploader
      .upload(photo.tempFilePath)
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashPassword, // Store the hashed password
      phone,
      education,
      role,
      photo: {
        public_id: uploadResult.public_id,
        url: uploadResult.url,
      },
    });

    await user.save();

    if (user) {
      console.log("User registered successfully!");
      const token = await createTokenAndSaveCookies(user._id, res);
      return res
        .status(200)
        .json({ message: "User registered successfully", user, token: token });
    }
  } catch (error) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (role !== user.role) {
      return res.status(400).json({ message: "Incorrect role!" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Correct comparison
    if (!isMatch) {
      // If password doesn't match
      return res.status(400).json({ message: "Incorrect password!" });
    }

    let token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });

    return res.status(200).json({ message: "User logged in", user });
  } catch (error) {
    return res.status(501).json({ message: "Internal server error!",error:error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ admins });
};
