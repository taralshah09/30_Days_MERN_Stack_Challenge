import { Board } from "../models/board.models.js";
import { Conversation } from "../models/conversation.models.js";
import { Task } from "../models/task.models.js";

export const createConversation = async (req, res) => {
  try {
    const { access_code, password, boards, users, createdBy, title } = req.body;
    const conversation = new Conversation({
      access_code,
      password,
      boards,
      users,
      createdBy,
      title,
    });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate({
        path: "boards",
        populate: {
          path: "tasks",
          model: "Task",
        },
      })
      .populate("users")
      .populate("createdBy");
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { access_code, password, boards, users, title } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { access_code, password, boards, users, title },
      { new: true }
    );
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndDelete(req.params.id);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllConversation = async (req, res) => {
  try {
    const conversations = await Conversation.find();

    if (!conversations) {
      return res
        .status(400)
        .json({ message: "Unable to fetch the conversations" });
    }

    return res.status(200).json({
      message: "All the conversations are fetched successfully!",
      conversations: conversations,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, unable to fetch all the converations",
      error: error.message,
    });
  }
};

export const addBoardInconversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // Create a new board
    const newBoard = new Board({ title });
    await newBoard.save();

    // Add the board to the conversation
    const conversation = await Conversation.findById(id);
    conversation.boards.push(newBoard._id);
    await conversation.save();

    res.status(201).json(newBoard);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add board", error: error.message });
  }
};

export const updateBoardInConversation = async (req, res) => {
  try {
    const { conversationId, boardId } = req.params;
    const { title } = req.body;

    // Find and update the board
    const board = await Board.findByIdAndUpdate(
      boardId,
      { title },
      { new: true }
    );

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Failed to update board", error });
  }
};

export const deleteBoardFromConversation = async (req, res) => {
  try {
    const { conversationId, boardId } = req.params;

    // Remove the board from the conversation's boards array
    await Conversation.findByIdAndUpdate(conversationId, {
      $pull: { boards: boardId },
    });

    // Delete the board document itself
    await Board.findByIdAndDelete(boardId);

    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete board", error });
  }
};

