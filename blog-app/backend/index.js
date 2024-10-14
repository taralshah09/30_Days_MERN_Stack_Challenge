import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import mongoose from "mongoose";
import { router as userRouter } from "./routes/user.routes.js";
import { router as blogRouter} from "./routes/blog.routes.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected!"))
  .catch((error) => console.log("Error in conncting to MONGODB"));

const app = express();
const PORT = process.env.PORT;

// In-built Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow credentials to be sent
  })
);

// --------------------------------------------
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routers configuration
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
