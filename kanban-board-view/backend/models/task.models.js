import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      uppercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    asignee: {
      type: [String],
      default: [],
    },
    markAsDone: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = new mongoose.model("Task", taskSchema);
