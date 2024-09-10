import React, { useEffect, useState } from "react";
import "./HomePage.css";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";

import axios from "axios";
import Note from "../../components/Note/Note";
import EditPage from "../../components/EditPage/EditPage";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [addPage, setAddPage] = useState(false);
  const [editPage, setEditPage] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsElem, setTagsElem] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/notes", { withCredentials: true })
      .then((res) => {
        console.log(res.data.notes);
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.log(err.message);
        throw new Error(err.message);
      });
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:3000/notes",
        { title, content, tags },
        { withCredentials: true }
      )
      .then(() => {
        console.log("todo added");
        setAddPage(false);
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };

  const updateNote = (id) => {
    setEditPage(true)
    axios
      .put(
        "http://localhost:3000/notes/" + id,
        { title, content, tags },
        { withCredentials: true }
      )
      .then(() => {
        console.log("todo added");
        setEditPage(false);
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3000/notes/${id}`, { withCredentials: true })
      .then(() => {
        console.log("To do removed!");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="home-page-container">
      <DashboardNavbar />

      <div className="add-box">
        <button onClick={() => setAddPage(true)}>Add</button>
      </div>
      <div className="notes-container">
        {addPage ? (
          <div className="add-page-container">
            <i
              className="fa-solid fa-xmark cross"
              onClick={() => setAddPage(false)}
            ></i>
            <form action="">
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="content">Content</label>
                <textarea
                  name="content"
                  id="content"
                  placeholder="Enter content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div
                className="tags-box"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label htmlFor="tags">Tags</label>
                <div className="tags-container">
                  {tags.map((tag, index) => (
                    <p className="tag-btn">
                      <i className="fa-solid fa-xmark">
                        <span>{tag}</span>
                      </i>
                    </p>
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  <input
                    onChange={(e) => setTagsElem(e.target.value)}
                    name="tags"
                    id="tags"
                    placeholder="Enter tags"
                  />
                  <button
                    style={{
                      width: "30px",
                      fontSize: "20px",
                      color: "rgb(94, 159, 245)",
                      background: "white",
                      border: "1px solid rgb(94,159,245)",
                      borderRadius: "5px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setTags((prev) => [...prev, tagsElem]);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button type="Submit" id="add" onClick={addNote}>
                Add
              </button>
            </form>
          </div>
        ) : (
          ""
        )}

        

        {notes.map((note, index) => (
          <Note note={note} key={index} deleteNote={deleteNote} editPage={editPage} setEditPage={setEditPage} updateNote={updateNote} title={title} content={content} tags={tags}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
