import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  size: {
    type: Number,
    required: true,
  },
  upload_timestamp: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

export const File = mongoose.model("File", filesSchema);
