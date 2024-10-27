import express from "express";
import {
  allUsers,
  login,
  logout,
  signUp,
} from "../controllers/user.controllers.js";
import { secureRoute } from "../middlewares/secureRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", secureRoute, allUsers);
export { router };
