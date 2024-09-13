import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [imgFile, setImgFile] = useState("");
  const [fileDetails, setFileDetails] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imgFile) {
      alert("Please select a file before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("imgFile", imgFile);

    axios
      .post("http://localhost:3000/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("File uploaded successfully");
        setFileDetails(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log("Error:", error.message));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/files")
      .then((res) => {
        console.log("Files fetched successfully");
        setFiles(res.data.files);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const renderFileIcon = (file) => {
    if (file && file.mimetype && typeof file.mimetype.startsWith === 'function' && file.mimetype.startsWith("image/")) {
      return <i className="fa-solid fa-file-image"></i>;
    }
    return <i className="fa-solid fa-file"></i>;
  };

  return (
    <div className="container">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          className="form-control-file"
          name="imgFile"
          onChange={handleFileChange}
        />
        <input
          type="submit"
          value="Upload"
          style={{
            background: "black",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
          className="btn btn-default"
        />
      </form>

      {fileDetails && fileDetails.file && (
        <div className="file-details">
          <div className="img-box">
            {renderFileIcon(fileDetails.file)}
          </div>
          <div className="text-details">
            <p id="title">{fileDetails.file.originalname}</p>
            <p id="size">
              {Math.round(fileDetails.file.size / 1024) + " KB"}
            </p>
            <p id="path">{fileDetails.file.path}</p>
          </div>
        </div>
      )}

      <div className="all-files-container">
        {files && files.length > 0 ? (
          <div className="files-container">
            {files.map((file, index) => (
              <div className="file-details" key={index}>
                <div className="img-box">
                  {renderFileIcon(file)}
                </div>
                <div className="text-details">
                  <p id="title">{file.name.split("-")[1]}</p>
                  <p id="size">{file.size ? Math.round(file.size / 1024) + " KB" : 'Unknown size'}</p>
                  <p id="path">{file.path || 'Unknown path'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No files available</p>
        )}
      </div>
    </div>
  );
}

export default App;