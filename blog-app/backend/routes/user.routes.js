import {
  login,
  logout,
  register,
  getMyProfile,
  getAdmins,
} from "../controllers/user.controllers.js";

import express from "express";
import { isAuthenticated } from "../middlewares/authUser.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

//
router.get("/my-profile", isAuthenticated, getMyProfile);
// router.get("/admins", isAuthenticated,getAdmins);
router.get("/admins",getAdmins);
export { router };
