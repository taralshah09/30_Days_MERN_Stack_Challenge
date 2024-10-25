import { configDotenv } from "dotenv";
import { Post } from "../models/posts.models.js";
configDotenv();
import { v2 as cloudinary } from "cloudinary";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "name email profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "name profilePicture",
        },
      })
      .populate({
        path: "likes",
        populate: {
          path: "createdBy",
          select: "name profilePicture",
        },
      });
    //  await Post.find().populate('createdBy', 'name email');
    if (!posts) {
      return res.status(400).json({ message: "Posts not found!" });
    }
    return res
      .status(200)
      .json({ message: "Posts fetched successfully!", posts });
  } catch (error) {}
};

export const createPost = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Post image is required!" });
    }

    const { media } = req.files;

    const allowedFormats = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedFormats.includes(media.mimetype)) {
      return res.status(400).json({
        message: "Media is supposed to be in jpg or png format only!",
      });
    }

    // Cloudinary part
    const uploadResult = await cloudinary.uploader
      .upload(media.tempFilePath)
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);

    const { createdBy, caption, comments, likes } = req.body;

    // Validate required fields
    if (!createdBy || !caption || !media) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields" });
    }

    const post = new Post({
      createdBy,
      caption,
      comments,
      likes,
      media: {
        public_id: uploadResult.public_id,
        url: uploadResult.url,
      },
    });
    await post.save();

    // Respond with the created post
    return res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    // Catch and handle errors
    return res.status(500).json({
      message: "Unable to create the post, something went wrong",
      error: error.message,
    });
  }
};

export const fetchMyPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = id;

    const myPosts = await Post.find({ createdBy: userId })
      .populate("createdBy", "name email profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "name profilePicture",
        },
      })
      .populate({
        path: "likes",
        populate: {
          path: "createdBy",
          select: "name profilePicture",
        },
      });
    if (!myPosts) {
      return res.status(400).json({ message: "My Posts not found!" });
    }
    return res
      .status(200)
      .json({ message: "My Posts fetched successfully ", posts: myPosts });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong , error in fetching my posts",
      error,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(400).json({ message: "No such post found!" });
    }

    return res
      .status(200)
      .json({ message: "Post deleted successfully!", post: post });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, failed to delete the post",
      error: error,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { media } = req.files;
    const { createdBy, caption } = req.body;

    const allowedFormats = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedFormats.includes(media.mimetype)) {
      return res.status(400).json({
        message: "Media is supposed to be in jpg or png format only!",
      });
    }

    // Cloudinary part
    const uploadResult = await cloudinary.uploader
      .upload(media.tempFilePath)
      .catch((error) => {
        console.log(error);
      });

    const post = await Post.findByIdAndUpdate(id, {
      media: media,
      caption: caption,
      createdBy: createdBy,
    });

    if (!post) {
      return res.status(400).json({ message: "Post not found!" });
    }
    return res
      .status(200)
      .json({ message: "Post updated successfully!", post: post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, unable to update the post",
      error,
    });
  }
};
