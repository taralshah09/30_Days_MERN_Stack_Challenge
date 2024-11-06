import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    uppercase: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Task",
  },
});

export const Board = new mongoose.model("Board", boardSchema);
