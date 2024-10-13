import express from "express";
import {
  login,
  signup,
  logout,
  allUsers,
} from "../controllers/user.controllers.js";
import secureRoute from "../middlewares/secure-route.middlewares.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers", secureRoute, allUsers);


export { router };
