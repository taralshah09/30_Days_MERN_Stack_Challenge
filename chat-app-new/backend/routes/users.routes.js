import express from "express";
import { login, logout, signUp } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export { router };
