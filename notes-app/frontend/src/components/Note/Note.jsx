import React, { useState } from "react";
import "./Note.css";
import EditPage from "../EditPage/EditPage";

const Note = ({
  note,
  deleteNote,
  editPage,
  setEditPage,
  updateNote,
  title,
  content,
  tags,
}) => {
  const timestamp = note.createdAt;

  // Create a Date object
  const dateObject = new Date(timestamp);

  // Extract day, month, and year
  const year = dateObject.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();

  // Function to add suffix to day
  const getDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const formattedDate = `${getDayWithSuffix(day)} ${month} ${year}`;
  const [title2, setTitle2] = useState("");
  const [content2, setContent2] = useState("");
  const [tags2, setTags2] = useState([]);
  const [tagsElem, setTagsElem] = useState("");
  return (
    <>
      {editPage ? (
        <EditPage
          editPage={editPage}
          setEditPage={setEditPage}
          title2={title2}
          setTitle2={setTitle2}
          content={content2}
          setContent={setContent2}
          tags={tags2}
          setTags={setTags2}
          tagsElem={tagsElem}
          setTagsElem={setTagsElem}
          updateNote={updateNote}
          noteId={note._id}
          noteTitle={note.title}
          noteContent={note.content}
          noteTags={note.tags}
        />
      ) : (
        ""
      )}

      <div className="note">
        <h2>{note.title}</h2>
        <span>{formattedDate}</span>
        <p>
          {note.content.length > 55
            ? note.content.substring(0, 55)
            : note.content}
        </p>
        <div className="other-details">
          <div className="tags-box">
            {note.tags.map((tag, index) => (
              <span key={index}>{`#${tag}`} </span>
            ))}
          </div>
          <div className="btns-box">
            <i
              className="fa-solid fa-pen"
              onClick={() => updateNote(note._id)}
            ></i>
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteNote(note._id)}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
