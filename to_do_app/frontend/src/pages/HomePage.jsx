import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [newTitle, setNewtitle] = useState(title);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos", { withCredentials: true })
      .then((res) => {
        console.log(res.data.todos);
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await axios.post(
        "http://localhost:3000/todos",
        {
          title,
        },
        { withCredentials: true }
      );
      console.log("Todo created successfully!");
      setTitle("");
      window.location.reload();
    } catch (error) {
      // Catch and handle errors from the API request
      console.error("Failed to create todo:", error.message);
      alert("Failed to create todo, please try again.");
    }
  };

  const toggleTodo = async (id) => {
    try {
      // Check if the ID is valid
      if (!id) {
        throw new Error("Invalid ID provided");
      }

      // Send a PATCH request to the toggle endpoint
      const response = await axios.patch(
        `http://localhost:3000/todos/toggle/${id}`,
        {}, // Empty object since no data is being sent in the body
        { withCredentials: true } // This should be in the third argument
      );

      // Log success message or handle UI update
      console.log("Task toggled successfully!", response.data);
      window.location.reload();
    } catch (error) {
      // Log detailed error message for debugging
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  const updateTitle = async (id) => {
    try {
      if (!id) {
        throw new Error("Invalid ID provided");
      }

      const response = await axios.patch(
        `http://localhost:3000/todos/${id}`,
        { title: newTitle },
        { withCredentials: true } 
      );

      console.log(response.data.todo);
      setEdit((prev) => !prev);
    } catch (error) {
      console.log("Error:", error.response?.data?.message || error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      if (!id) {
        throw new Error("Invalid error!");
      }

      const response = await axios.delete(`http://localhost:3000/todos/${id}`);
      if (!response) {
        console.log("unable to delete todo");
      }
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios
        .post(
          "http://localhost:3000/users/logout",
          {},
          { withCredentials: true }
        )
        .then(() => {
          console.log("User logged out successfully!");
          navigate("/login");
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <div className="container">
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
      <div className="inner-container">
        <h1>To Do App</h1>
        <form action="" className="input-box" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your todo here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <div className="todos-container">
          {todos.map((todo, index) => {
            return (
              <div className="todo" key={index}>
                <i
                  className={
                    todo.completed
                      ? "fa-solid fa-circle"
                      : "fa-regular fa-circle"
                  }
                ></i>
                <p
                  onClick={() => toggleTodo(todo._id)}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </p>
                <i
                  onClick={() => setEdit((prev) => !prev)}
                  className="fa-solid fa-pen-to-square"
                  style={{ color: "#5DA9E9", fontSize: "18px" }}
                ></i>
                <i
                  onClick={() => deleteTodo(todo._id)}
                  className="fa-solid fa-trash"
                  style={{ color: "#5DA9E9", fontSize: "18px" }}
                ></i>
                <div
                  className="edit-box"
                  style={{
                    display: edit ? "flex" : "none",
                  }}
                >
                  <h2>Edit Todo</h2>
                  <form onSubmit={() => updateTitle(todo._id)}>
                    <input
                      type="text"
                      placeholder="Enter your new title"
                      value={newTitle}
                      onChange={(e) => setNewtitle(e.target.value)}
                    />
                    <button type="submit">Edit</button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
