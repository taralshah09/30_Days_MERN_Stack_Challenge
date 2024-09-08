import mongoose from "mongoose";
import express from "express";
import { configDotenv } from "dotenv";
import { router as userRouter } from "./routes/user.routes.js";
configDotenv();
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as todosRouter } from "./routes/todos.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:5173"], // Ensure this matches your frontend URL
    credentials: true, // Allow credentials such as cookies
  })
);
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/todos", todosRouter);

app.listen(PORT, () => console.log("Server running on PORT : ", PORT));
