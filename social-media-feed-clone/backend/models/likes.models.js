import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,  // Ensures the like is linked to a user
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",  // Links the like to a specific post
        required: true,
    }
}, { timestamps: true });

export const Like = mongoose.model("Like", likeSchema);
