import express from "express";
import passport from "passport";
import { User } from "../models/user.models.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
const router = express.Router();

// Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/auth/google/success", // Redirect to success route
  })
);

router.get("/me", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-__v"); // Exclude unnecessary fields
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    req.session.destroy(); // Destroy session to clear cookies
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.json({ message: "Logged out successfully" });
  });
});

export { router };
