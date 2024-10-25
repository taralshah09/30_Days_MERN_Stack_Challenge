import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,  // Ensures the comment is linked to a user
    },
    content: {
        type: String,
        required: true,
        maxlength: 500,  // Restricts comment length to 500 characters
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",  // Links the comment to a specific post
        required: true,
    }
}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema);
