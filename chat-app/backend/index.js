import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { router as userRouter } from "./routes/user.routes.js";
import { router as messageRouter } from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./SocketIO/server.js";

configDotenv();

app.use(cors());

// app.use(
//     cors({
//       origin: ["http://localhost:3000","http://localhost:5173"], // Ensure this matches your frontend URL
//       credentials: true, // Allow credentials such as cookies
//     })
//   );

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DB connected");
} catch (error) {
  console.log(error);
}
const PORT = process.env.PORT || 3000;

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

app.use("/info", (req, res) => {
  res.status(200).json({ message: "Successfuly authorised", id: req.id });
});

app.get("/chats", (req, res) => {
  res.status(200).json({ message: "Successfully registered" });
});

server.listen(PORT, () => console.log("Server running!"));
