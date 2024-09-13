import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err.message));

const app = express();

app.listen(PORT, () => console.log("Server running on PORT : ", PORT));
