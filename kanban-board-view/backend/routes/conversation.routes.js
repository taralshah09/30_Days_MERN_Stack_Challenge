import express from "express";
import {
  createConversation,
  getConversation,
  updateConversation,
  deleteConversation,
  getAllConversation,
  addBoardInconversation,
  updateBoardInConversation,
  deleteBoardFromConversation,
} from "../controllers/conversation.controllers.js";
import { authUser } from "../middlewares/users.middlewares.js";

const router = express.Router();

router.post("/", authUser, createConversation);

router.get("/", getAllConversation);

router.get("/:id", authUser, getConversation);

router.put("/:id", authUser, updateConversation);

router.delete("/:id", authUser, deleteConversation);

// Adding board within the conversation
router.post("/:id/boards", addBoardInconversation);

// PUT - Update a board within a conversation
router.put("/:conversationId/boards/:boardId", updateBoardInConversation);

// DELETE - Remove a board from a conversation
// router.delete("/:conversationId/boards/:boardId", deleteBoardFromConversation);

router.delete('/:id/boards/:boardId', deleteBoardFromConversation);

export { router };
