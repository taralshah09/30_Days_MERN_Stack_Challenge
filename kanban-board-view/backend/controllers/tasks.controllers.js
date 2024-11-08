import { Task } from "../models/task.models.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found!" });
    }
    return res
      .status(200)
      .json({ message: "All tasks fetched successfully!", tasks: tasks });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, unable to fetch all the tasks!",
    });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    return res
      .status(200)
      .json({ message: "Task fetched successfully", task: task });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, unable to fetch the task!",
    });
  }
};

export const createTask = async (req, res) => {
  const { title, description, assignedTo, markAsDone, createdBy } = req.body;
  try {
    const task = new Task({
      title,
      description,
      assignedTo,
      markAsDone,
      createdBy,
    });
    if (!task) {
      return res.status(400).json({ message: "Failed to create a new task!" });
    }
    await task.save();
    return res
      .status(200)
      .json({ message: "Task created successfully", task: task });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, unable to create the task!",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong,unable to delete the task",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, markAsDone } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        assignedTo,
        markAsDone,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

export const moveTask = async (req, res) => {
  const { taskId } = req.params;
  const { destinationBoardId, destinationIndex } = req.body;

  try {
    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Find the board currently containing the task
    const sourceBoard = await Board.findOne({ tasks: taskId });
    if (!sourceBoard)
      return res.status(404).json({ message: "Source board not found" });

    // If the task is moving to a different board
    if (sourceBoard._id.toString() !== destinationBoardId) {
      // Remove task from the source board's tasks array
      await Board.findByIdAndUpdate(sourceBoard._id, {
        $pull: { tasks: taskId },
      });

      // Add task to the destination board at specified position
      await Board.findByIdAndUpdate(destinationBoardId, {
        $push: { tasks: { $each: [taskId], $position: destinationIndex } },
      });

      // Update task's board reference (optional: depends on your app structure)
      task.boardId = destinationBoardId;
      await task.save();
    } else {
      // Task is being reordered within the same board
      await Board.findByIdAndUpdate(destinationBoardId, {
        $pull: { tasks: taskId },
      });

      await Board.findByIdAndUpdate(destinationBoardId, {
        $push: { tasks: { $each: [taskId], $position: destinationIndex } },
      });
    }

    res.status(200).json({ message: "Task moved successfully", task });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while moving the task" });
  }
};
