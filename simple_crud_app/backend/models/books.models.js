import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index:true,
      trim:true
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      lowercase:true,
      index:true,
      trim:true
    },
  },
  {
    timestamps: true,
  }
);

export const Books = mongoose.model("Books", booksSchema);
