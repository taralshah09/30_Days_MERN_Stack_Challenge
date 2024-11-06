import express from "express";
import { createUser,loginUser, logoutUser } from "../controllers/users.controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "USer route!" });
});


router.post("/register",createUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);

export { router };
