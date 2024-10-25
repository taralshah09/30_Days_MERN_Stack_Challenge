import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures post is linked to a user
    },
    media: {
        public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
    },
    caption: {
      type: String,
      maxlength: 100,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postsSchema);
