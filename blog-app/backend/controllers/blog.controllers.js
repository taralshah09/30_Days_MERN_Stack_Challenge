import { Blog } from "../models/blog.models.js";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Blog's image file is required" });
    }

    const { blogImage } = req.files;
    const allowedFormats = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Blog Image is supposed to be in jpg or png format only!",
      });
    }

    const { title, category, about } = req.body;

    if (!title || !category || !about) {
      return res.status(400).json({
        message: "Title, category and about are all the required fields",
      });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const uploadResult = await cloudinary.uploader
      .upload(blogImage.tempFilePath)
      .catch((error) => {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image");
      });

    console.log(uploadResult);

    const blogData = {
      title,
      category,
      about,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: uploadResult.public_id,
        url: uploadResult.url,
      },
    };

    const blog = await Blog.create(blogData);

    return res.status(200).json({ message: "Blog created successfully", blog });
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};

export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(updatedBlog);
};