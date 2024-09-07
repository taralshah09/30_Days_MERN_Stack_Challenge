import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !publishYear || !genre) {
      alert("Please fill all the fields");
      return;
    }

    try {
      await axios
        .post("http://localhost:3000/api/books", { title, author, publishYear, genre })
        .then(() => {
          console.log("Book added");
          navigate("/");
        })
        .catch((err) => {
          console.log("Error in adding the book");
          console.log(err.message);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <div className="add-page-container">
      <nav>
        <a href="/">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </a>
      </nav>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Add page</h1>

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
          <button type="submit">Add book</button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
