import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { router as userRouter } from "./routes/users.routes.js";
import { router as notesRouter } from "./routes/notes.routes.js";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Error : ", err.message));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
