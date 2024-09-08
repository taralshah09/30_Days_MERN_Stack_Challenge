import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Books = mongoose.model("Books", booksSchema);
