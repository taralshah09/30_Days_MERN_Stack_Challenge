import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
import cookieParser from "cookie-parser";
import { router as userRouter } from "./routes/users.routers.js";
import { router as jobsRouter } from "./routes/jobs.routes.js";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB conencted!"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/users", userRouter);
app.use("/jobs", jobsRouter);

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
