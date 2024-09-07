import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
import { router as booksRouter} from "./routes/books.routes.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Error in connecting with DB"));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Setting up the router for books route
app.use("/api/books",booksRouter);



app.listen(PORT, () => console.log("Server running on PORT : ", PORT));
