import React, { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "../components/BooksTable";
import { Link, NavLink } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((res) => {
        console.log("Books fetched successfully");
        setBooks(res.data.books);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="home-container">
      <nav>
        <h1>Books App</h1>
        <button>
          <NavLink to="/add" className="link">
            <i className="fa-solid fa-plus"></i>
            Add
          </NavLink>
        </button>
      </nav>
      <div className="books-container">
        <BooksTable books={books} />
      </div>
    </div>
  );
};

export default HomePage;
