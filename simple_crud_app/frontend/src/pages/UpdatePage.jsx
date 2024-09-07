import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const { state } = useLocation();
  const { book } = state || {};
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPublishYear(book.publishYear || "");
      setGenre(book.genre || "");
    }
  }, [book]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/books/${book._id}`, {
        title,
        author,
        publishYear,
        genre,
      })
      .then(() => {
        console.log("Book updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <div className="update-page-container">
      <nav>
        <a href="/">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </a>
      </nav>
      <div className="update-container">
        <form onSubmit={handleUpdate}>
          <h1>
            Update : <span>{book.title}</span>
          </h1>

          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author"
          />
          <input
            type="number"
            name="publishYear"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            placeholder="Enter publish year"
          />
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter genre"
          />
          <button type="submit">Update book</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
