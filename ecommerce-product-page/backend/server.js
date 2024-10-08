import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { router as productRouter } from "./routes/products.routes.js";
configDotenv();
import cors from "cors"

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err.message));

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products",productRouter);

app.listen(PORT, () => console.log("Server running on PORT : ", PORT));
