import express from "express";
import {
  createUser,
  loginUser,
  updateUserProfile,
} from "../controllers/users.controllers.js";
import { secureRoute } from "../middlewares/secureRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "All users goes here!" });
});

router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/update-profile", secureRoute, updateUserProfile);

export { router };
