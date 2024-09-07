import express from "express";
import { Books } from "../models/books.models.js";

const router = express.Router();

// GET /api/books
router.get("/", async (req, res) => {
  const books = await Books.find();

  try {
    if (!books) {
      return res.status(400).json({ message: "Books not found!" });
    }
    res
      .status(200)
      .json({ message: "Books successfully fetched", books: books });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, unable to fetch the books" });
  }
});

// GET /api/books/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findById(id);

    if (!book) {
      return res.status(400).json({ message: "Unable to find the book!" });
    }

    res.status(200).json({ message: "Book fetched successfully", book: book });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong , unable to fetch this book!" });
  }
});

// POST /api/books
router.post("/", async (req, res) => {
  const { title, author, genre, publishYear } = req.body;

  if (!title && !author && !genre && !publishYear) {
    return res
      .status(400)
      .json({ message: "All the fields are required to be filled!" });
  }

  try {
    const book = await Books.create({ title, author, genre, publishYear });

    if (!book) {
      return res.status(400).json({ message: "Unable to create a book!" });
    }

    res.status(200).json({ message: "Book created successfully", book: book });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong , unable to create a book!" });
  }
});

// PUT /api/books/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { title, author, genre, publishYear } = req.body;

  if (!title && !author && !genre && !publishYear) {
    return res
      .status(400)
      .json({ message: "All the fields are required to be filled!" });
  }

  try {
    const book = await Books.findByIdAndUpdate(id, {
      title,
      author,
      genre,
      publishYear,
    });

    if (!book) {
      return res.status(400).json({ message: "Unable to update a book!" });
    }

    const updatedBook = await Books.findById(id);

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong , unable to update a book!" });
  }
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Please enter the id of the book to be deleted" });
  }

  try {
    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(400).json({ message: "Book not found!" });
    }

    return res
      .status(200)
      .json({ message: "Book successfully deleted", book: deletedBook });
  } catch (error) {
    return res
      .status(500)
      .json("Something went wrong , unable to delete the book!");
  }
});

export { router };
