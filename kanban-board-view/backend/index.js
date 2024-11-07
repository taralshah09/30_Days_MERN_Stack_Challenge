import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import mongoose from "mongoose";
import { router as userRouter } from "./routes/user.routes.js";
import { router as tasksRouter } from "./routes/tasks.routes.js";
import { router as boardsRouter } from "./routes/boards.routes.js";
import { router as conversationRouter } from "./routes/conversation.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log("Error : ", err.message));
const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/users", userRouter);
app.use("/tasks", tasksRouter);
app.use("/boards", boardsRouter);
app.use("/conversations", conversationRouter);

app.listen(PORT, () => console.log("Server running on PORT : " + PORT));
