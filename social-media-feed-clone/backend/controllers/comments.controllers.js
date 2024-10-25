import { Comment } from "../models/comments.models.js";
import { Post } from "../models/posts.models.js";

export const createComments = async (req, res) => {
  try {
    const { postId } = req.params; // Get postId from the request parameters
    const { content, createdBy } = req.body; // Get comment content and user id from the request body

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new comment
    const comment = new Comment({
      content,
      createdBy, // Assuming createdBy is the user's ID
      post: postId,
    });

    // Save the comment to the database
    await comment.save();

    // Add the comment ID to the post's comments array
    post.comments.push(comment._id);
    await post.save(); // Save the updated post

    // Now populate the createdBy field (this does not modify the saved comment, it just populates the reference for the response)
    const populatedComment = await Comment.findById(comment._id).populate(
      "createdBy",
      "name profilePicture"
    );

    await populatedComment.save()

    res.status(201).json(populatedComment); // Return the populated comment in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};
