import { Post } from "../models/posts.models.js";
import { Like } from "../models/likes.models.js";

export const addLikes = async (req, res) => {
  try {
    const { postId } = req.params; // Get postId from the request parameters
    const {  createdBy } = req.body; //Get user details who liked the post

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new comment
    const like = new Like({
      createdBy, // Assuming createdBy is the user's ID
      post: postId,
    });

    // Save the like to the database
    await like.save();

    // Add the like ID to the post's comments array
    post.likes.push(like._id);
    await post.save(); // Save the updated post

    // Now populate the createdBy field (this does not modify the saved like, it just populates the reference for the response)
    const populatedLike = await Like.findById(like._id).populate(
      "createdBy",
      "name "
    );

    await populatedLike.save()

    res.status(201).json(populatedLike); // Return the populated like in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};
