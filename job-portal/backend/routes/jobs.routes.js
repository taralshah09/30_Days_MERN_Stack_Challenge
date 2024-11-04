import express from "express";
import { checkAdmin, secureRoute } from "../middlewares/secureRoutes.js";
import { createJobs } from "../controllers/jobs.controllers.js";

const router = express.Router();

router.get("/", secureRoute, (req, res) => {
  res.status(200).json({ message: "Authenticated user!" });
});

router.get("/dashboard", checkAdmin, (req, res) => {
  res
    .status(200)
    .json({ message: "Access granted to admin for viewing this page!" });
});

router.post("/create", createJobs);

export { router };
