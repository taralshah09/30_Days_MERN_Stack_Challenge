import express from "express";
import {
  createBoard,
  getBoard,
  updateTaskOrder,
  deleteBoard,
} from "../controllers/boards.controllers.js";

const router = express.Router();

router.post("/", createBoard);

router.get("/:id", getBoard);

router.patch("/:id", updateTaskOrder);

router.delete(":id", deleteBoard);

export { router };
