import express from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { Product } from "../models/products.models.js";

const router = express.Router();

// Test route to check if the server is working fine
router.get("/", (req, res) => {
  res.status(200).json({ message: "Working fine" });
});

// POST route to upload cover image and create a product
router.post(
  "/upload",
  upload.fields([
    { name: "coverImage", maxCount: 1 }, // Handle cover image
  ]),
  async (req, res) => {
    const { title, price, ratings, description, category } = req.body;

    // Debugging: Log received files
    console.log("Files:", req.files);

    // Access uploaded files
    const coverImage = req.files.coverImage ? req.files.coverImage[0] : null;

    // Check if cover image is uploaded
    if (!coverImage) {
      return res.status(400).json({
        message: "Cover Image not uploaded!",
        files: req.files, // Return the entire files object for debugging
      });
    }

    // Create a new product with the uploaded cover image
    const product = await Product.create({
      title,
      price,
      ratings,
      description,
      category,
      coverImage: coverImage.path, // Save cover image path
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
  "/upload/productImages",
  upload.fields([
    { name: "productImages", maxCount: 5 }, // Handle multiple product images
  ]),
  async (req, res) => {
    const { productId } = req.body; // Assume productId is passed in the body

    // Debugging: Log received files
    console.log("Files:", req.files);

    // Access uploaded product images
    const productImages = req.files.productImages ? req.files.productImages : [];

    if (productImages.length === 0) {
      return res.status(400).json({
        message: "Product Images not uploaded!",
        files: req.files, // Return the entire files object for debugging
      });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Update product images
    product.productImages = productImages.map((img) => img.path);

    // Save the updated product
    await product.save();

    res.json({
      message: "Product Images updated successfully!",
      product: product,
    });
  }
);

export { router };
