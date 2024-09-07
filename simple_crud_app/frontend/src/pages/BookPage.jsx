// BookPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookPage = () => {
  const { state } = useLocation();
  const { book } = state || {}; // Access the passed state
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [publishYear, setPublishYear] = useState(book?.publishYear || "");
  const [genre, setGenre] = useState(book?.genre || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!book) {
      alert("No book data found!");
      navigate("/");
    }
  }, [book, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !publishYear || !genre) {
      alert("Please fill all the fields");
      return;
    }

    try {
      await axios
        .get(`http://localhost:3000/api/books/${book._id}`)
        .then(() => {
          console.log("Book updated");
          navigate("/");
        })
        .catch((err) => {
          console.log("Error in updating the book");
          console.log(err.message);
        });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="info-page-container">
      <nav>
        <a href="/">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </a>
      </nav>
      <div className="info-box">
        <div className="info">
          <h1>{book?.title}</h1>
          <p>Author: {book?.author}</p>
          <p>Publish Year: {book?.publishYear}</p>
          <p>Genre: {book?.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
