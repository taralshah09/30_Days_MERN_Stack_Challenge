import { Board } from "../models/board.models.js";

export const createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const board = new Board({ title });
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate("tasks");
    res.status(200).json(board);
  } catch (error) {
    res.status(404).json({ message: "Board not found" });
  }
};

export const updateTaskOrder = async (req, res) => {
  try {
    const { taskIds } = req.body;
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    board.tasks = taskIds.filter((id) => id);
    await board.save();
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};