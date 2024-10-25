import { Router } from "express";
const router = Router();
import { configDotenv } from "dotenv";
import { Post } from "../models/posts.models.js";
import { Comment } from "../models/comments.models.js";
configDotenv();
import {
  createPost,
  deletePost,
  fetchMyPosts,
  getPosts,
  updatePost,
} from "../controllers/posts.controllers.js";
import { createComments} from "../controllers/comments.controllers.js";
import { addLikes } from "../controllers/likes.controllers.js";

// Regarding Posts
router.get("/all", getPosts);
router.post("/create", createPost);
router.get("/my-posts/:id", fetchMyPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// Regarding comments
router.post("/:postId/comments", createComments);

//Regarding likes
router.post("/:postId/likes",addLikes);

// router.delete("/:postId/comments/:commentId", deleteComment);
export { router };
