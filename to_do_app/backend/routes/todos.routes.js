import express from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import { Todo } from "../models/todos.models.js";

const router = express.Router();

// Get /todos/
router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({user:req.id});
  if (!todos) {
    return res.status(200).json({ message: "Your todos will be here" });
  }
  return res.status(200).json({ message: "Here are your todos", todos: todos });
});

// POST /todos/
router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.id;

    const newTodo = new Todo({
      title: title,
      user: userId,
    });

    await newTodo.save();
    res.status(201).json({ message: "Todo created", todo: newTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PATCH /todos/:id  -> For updating the title
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params; // ID of the todo to be updated
    const { title } = req.body; // New title for the todo

    // Find and update the todo, ensuring it belongs to the logged-in user
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.id }, // Find todo by ID and user ID
      { title }, // Fields to update
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    // If the todo is not found or not owned by the user, return an error
    if (!todo) {
      return res
        .status(400)
        .json({ message: "Todo not found or unauthorized access!" });
    }

    res.json({ message: "Todo successfully updated", todo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update todo", error: error.message });
  }
});

// PATCH /todos/:id -> For toggling the task
router.patch("/toggle/:id", auth, async (req, res) => {
  try {
    const { id } = req.params; // ID of the todo to be updated

    // Find the todo and ensure it belongs to the logged-in user
    const todo = await Todo.findOne({ _id: id, user: req.id });
    if (!todo) {
      return res
        .status(400)
        .json({ message: "Todo not found or unauthorized access!" });
    }

    // Toggle the completed status
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed: !todo.completed },
      { new: true, runValidators: true }
    );

    res.json({ message: "Todo successfully updated", updatedTodo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update todo", error: error.message });
  }
});

// DELETE /todos/:id
router.delete("/:id", auth,async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found!" });
    }

    res.json({ message: "Todo deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, unable to delete the todo!" });
  }
});


export { router };
