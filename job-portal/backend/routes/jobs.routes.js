import express from "express";
import { checkAdmin, secureRoute } from "../middlewares/secureRoutes.js";
import { createJobs, getJobs , editJobs, deleteJob} from "../controllers/jobs.controllers.js";

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
router.get("/get", getJobs);
router.patch("/edit/:id",editJobs);
router.delete("/delete/:id",deleteJob);

export { router };
