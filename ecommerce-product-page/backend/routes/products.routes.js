import express from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { Product } from "../models/products.models.js";
import { uploadOnCloud } from "../utils/cloudinary.utils.js";

const router = express.Router();

// Test route to check if the server is working fine
router.get("/", async (req, res) => {
  const products = await Product.find();
  res
    .status(200)
    .json({ message: "Here are all the products", products: products });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res
    .status(200)
    .json({ message: `Here is the product with id ${id}`, product: product });
});

// POST route to upload cover image and create a product
router.post(
  "/upload",
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),
  async (req, res) => {
    const { title, price, ratings, description, category } = req.body;

    console.log("Files:", req.files);

    const thumbnail = req.files.thumbnail ? req.files.thumbnail[0] : null;

    res.json(thumbnail);

    const thumbnailPath = thumbnail.path;
    const cloudinaryResponse = await uploadOnCloud(thumbnailPath);

    if (!thumbnail) {
      return res.status(400).json({
        message: "Cover Image not uploaded!",
        files: req.files,
      });
    }

    const product = await Product.create({
      title,
      price,
      ratings,
      description,
      category,
      thumbnail: cloudinaryResponse.url, // Save cover image path of cloudinary
    });

    if (!product) {
      return res.status(400).json({ message: "Failed to create a product!" });
    }

    res.json({
      message: "Product created successfully!",
      product: product,
    });
  }
);

// PATCH route to upload and update product images
router.patch(
  "/upload/images",
  upload.fields([
    { name: "images", maxCount: 5 }, // Handle multiple product images
  ]),
  async (req, res) => {
    const { productId } = req.body; // Assume productId is passed in the body

    console.log("Files:", req.files);

    const images = req.files.images
      ? req.files.images
      : [];

    if (images.length === 0) {
      return res.status(400).json({
        message: "Product Images not uploaded!",
        files: req.files,
      });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Upload images to Cloudinary and collect the URLs
    const cloudinaryUrls = [];
    for (const img of images) {
      const cloudinaryResponse = await uploadOnCloud(img.path);
      if (cloudinaryResponse) {
        cloudinaryUrls.push(cloudinaryResponse.url);
      }
    }

    // Update product images with Cloudinary URLs
    product.images = cloudinaryUrls;

    // Save the updated product
    await product.save();

    res.json({
      message: "Product Images updated successfully!",
      product: product,
    });
  }
);

export { router };
