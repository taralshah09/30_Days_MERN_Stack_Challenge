import React, { useState } from "react";
import "./EditPage.css";
const EditPage = ({
  editPage,
  setEditPage,
  title2,
  setTitle2,
  content,
  setContent,
  tags,
  tagsElem,
  setTags,
  setTagsElem,
  noteId,
  noteTitle,
  noteContent,
  noteTags,
  updateNote
}) => {
  const [notes, setNotes] = useState([]);
  const [addPage, setAddPage] = useState(false);

  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  //   const [tags, setTags] = useState([]);
  //   const [tagsElem, setTagsElem] = useState("");

  return (
    <div className="edit-page-container">
      <i
        className="fa-solid fa-xmark cross"
        onClick={() => setEditPage(false)}
      ></i>
      <form onSubmit={()=>updateNote(noteId)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title"
            value={noteTitle}
            onChange={(e) => setTitle2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder="Enter content"
            value={noteContent}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div
          className="tags-box"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="tags">Tags</label>
          <div className="tags-container">
            {noteTags.map((tag, index) => (
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
        <button type="submit" id="add" onClick={()=>updateNote(noteId)}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditPage;
