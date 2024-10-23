import express from "express";
const router = express.Router();
import "../passport/auth.passport.js";
import passport from "passport";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/auth/google/success", // Redirect to success route
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    req.session.destroy(); // Destroy session to clear cookies
    
    // Change the name of cookie in here
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.json({ message: "Logged out successfully" });
  });
});
export { router };
