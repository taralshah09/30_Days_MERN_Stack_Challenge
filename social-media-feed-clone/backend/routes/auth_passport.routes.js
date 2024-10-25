import express from "express";
const router = express.Router();
import "../passport/auth.passport.js";
import passport from "passport";
import { User } from "../models/users.models.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/auth/google/success", // Redirect to success route
  })
);

router.get("/me", isLoggedIn,async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json({ message: "User fetched successfully!", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong in fetching user details" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    req.session.destroy(); // Destroy session to clear cookies
    res.clearCookie("socialMediaCloneSessionID"); // Clear the session cookie
    res.json({ message: "Logged out successfully" });
  });
});
export { router };
