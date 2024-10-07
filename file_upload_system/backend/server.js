import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import multer from "multer";
import { File } from "./models/files.models.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// app.post("/uploads", upload.single("imgFile"), async function (req, res, next) {
//   console.log("File uploaded!");
//   const file = File.create({
//     name: req.file.filename,
//     size: req.file.size,
//     upload_timestamp: req.file.filename.split("-")[0],
//   });

//   if (!file) {
//     return res.json({ message: "Failed in saving file in DB" });
//   }
//   await file.save();
//   return res.json({ message: "File saved successfully" ,file : req.file});
// });

app.post("/uploads", upload.single("imgFile"), async (req, res, next) => {
  try {
    // Check if file exists in the request
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Create file record in the database
    const file = await File.create({
      name: req.file.filename,
      size: req.file.size,
      upload_timestamp: req.file.filename.split("-")[0], // Assuming the filename has a timestamp
      type: req.file.mimetype,
      path: req.file.path,
    });

    // Check if file was successfully saved to the database
    if (!file) {
      return res.status(500).json({ message: "Failed to save file to DB" });
    }

    // Respond with success message and file information
    return res.status(200).json({
      message: "File saved successfully",
      file: req.file, // Send back the file information
    });
  } catch (error) {
    console.error("Error in file upload:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

app.get("/files", async (req, res) => {
  const files = await File.find();
  if (!files) {
    res.status(404).json({ message: "No file found" });
  }

  return res
    .status(200)
    .json({ message: "Files fetched successfully", files: files });
});

app.listen(PORT, () => console.log("Server running on PORT : ", PORT));