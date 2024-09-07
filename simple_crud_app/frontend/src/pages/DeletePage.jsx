import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const DeletePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { book } = state || {};

  

  const handleDelete = async (e) => {
    e.preventDefault()

    await axios.delete(`http://localhost:3000/api/books/${book._id}`)
    .then(()=>{
      console.log("Book deleted successfully!")
      navigate("/")
    })
  }

  return (
    <div className="delete-page-container">
      <nav>
        <a href="/">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </a>
      </nav>
      <div className="delete-container">
        <div className="delete-box">
          <p>Are you sure you want to delete<br/> <span>{book.title}</span>?</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePage;
