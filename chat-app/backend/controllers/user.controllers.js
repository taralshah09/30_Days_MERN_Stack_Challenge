import { createTokenAndSaveCookie } from "../jwt/generateToken.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    createTokenAndSaveCookie(newUser._id, res);
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error); // Log actual error on the server
    return res.status(500).json({
      error: "An error occurred during registration. Please try again later.",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatch = bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong, unable to log the user in!" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id; // Access the user from the secureRoute middleware
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.log("Error in allUsers controller: " + error);
    res.status(500).json({ error: "Server error, try again later." });
  }
};

export { signup, login, logout, allUsers };
