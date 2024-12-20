import { createTokenAndSave } from "../jwt/generateToken.js";
import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User already registered!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Unable to register newUser" });
    }

    if (newUser) {
      createTokenAndSave(newUser._id, res);
      await newUser.save();
    }
    return res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, unable to register the user!",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect password!" });
    }

    createTokenAndSave(user._id, res);
    return res.status(200).json({
      message: "User logged in successfully!",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, unable to login the user!",
      error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false, // Set true if in production
      sameSite: "strict", // Helps prevent CSRF attacks
    });
    return res.status(200).json({
      message: "Successfully logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, unable to logout the user!",
      error,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    if (!users) {
      return res.status(400).json({ message: "Unable to fetch all users" });
    }

    return res
      .status(200)
      .json({ message: "Users fetched successfully!", users });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, unable to fetch all the users!",
      error,
    });
  }
};
