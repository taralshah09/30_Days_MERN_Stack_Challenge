import React from "react";
import { useNavigate } from "react-router-dom";

const BooksTable = ({ books }) => {
  const navigate = useNavigate();

  // Functions to handle navigation with state
  const handleInfoClick = (book) => {
    navigate("/info", { state: { book } });
  };

  const handleUpdateClick = (book) => {
    navigate("/update", { state: { book } });
  };

  const handleDeleteClick = (book) => {
    navigate("/delete", { state: { book } });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Sr No.</th>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>
              <i
                className="fa-solid fa-circle-info"
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  color: "var(--info-color)",
                }}
                onClick={() => handleInfoClick(book)} // Redirect with state
              ></i>
              <i
                className="fa-solid fa-pen-to-square"
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  color: "var(--update-color)",
                }}
                onClick={() => handleUpdateClick(book)} // Redirect with state
              ></i>
              <i
                className="fa-solid fa-trash"
                style={{
                  cursor: "pointer",
                  color: "var(--trash-color)",
                }}
                onClick={() => handleDeleteClick(book)} // Redirect with state
              ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
