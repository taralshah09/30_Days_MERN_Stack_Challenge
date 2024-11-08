import { Board } from "../models/board.models.js";
import { Task } from "../models/task.models.js";

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
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTaskToBoard = async (req, res) => {
  try {
    const { id } = req.params; // Board ID
    const { title } = req.body; // Task title
    const createdBy = req.user._id;
    
    // Step 1: Create a new task
    const newTask = new Task({ title, createdBy });
    await newTask.save();

    // Step 2: Find the board and add the new task's ID to the tasks array
    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    board.tasks.push(newTask._id);
    await board.save();

    // Step 3: Respond with the new task
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Failed to add task", error });
  }
};
