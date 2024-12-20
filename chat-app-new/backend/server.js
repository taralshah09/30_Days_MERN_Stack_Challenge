import { configDotenv } from "dotenv";
import express from "express";
configDotenv();
import mongoose from "mongoose";
import cors from "cors";
import { router as userRouter } from "./routes/users.routes.js";
import { router as messageRouter } from "./routes/messages.routes.js";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/index.js";

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Error in connecting DB : ", err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// In your server setup
app.use(cookieParser());

// Routes
app.use("/users", userRouter);
app.use("/messages", messageRouter);

server.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
