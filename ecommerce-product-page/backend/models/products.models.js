import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
    minlength: 5,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  ratings: {
    reviewCount: {
      type: Number,
      default: 0,
    },
    starRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  description: {
    type: String,
    required: true,
    minlength: 200,
    maxlength: 1000,
  },
  category: {
    type: [String], 
    required: true,
  },
  productImages: {
    type: [String], 
    required: true,
  },
  coverImage: {
    type: String, 
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
