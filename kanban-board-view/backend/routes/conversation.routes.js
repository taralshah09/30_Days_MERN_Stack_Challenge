import express from "express";
import {
  createConversation,
  getConversation,
  updateConversation,
  deleteConversation,
} from "../controllers/conversation.controllers.js";
import { authUser } from "../middlewares/users.middlewares.js";

const router = express.Router();

router.post("/", authUser, createConversation);

router.get("/:id", authUser, getConversation);

router.patch("/:id", authUser, updateConversation);

router.delete("/:id", authUser, deleteConversation);

export { router };
