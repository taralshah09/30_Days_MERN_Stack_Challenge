import express from "express";
import { configDotenv } from "dotenv";
configDotenv()
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connected!"))
.catch((error)=>console.log("Error in conncting to MONGODB"))

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
