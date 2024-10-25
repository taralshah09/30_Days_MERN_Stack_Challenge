import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { router as passportAuthRouter } from "./routes/auth_passport.routes.js";
configDotenv();
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { router as postsRouter } from "./routes/posts.routes.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "64934f00a20cfe83608afe5c46f671848bc5aa7bf4be4e68ad34cd7e35d79c92",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
    name: "socialMediaCloneSessionID",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/ ",
  })
);


// Cloudinary configurations 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// Initialising the OAuth passport part
app.use(passport.initialize());
app.use(passport.session());

// Routes
// 1. Authentication routes
app.use("/auth", passportAuthRouter);
app.get("/auth/google/success", (req, res) => {
  res.redirect("http://localhost:3000/"); // Redirect to your React dashboard
});

// 2. Posts Routes
app.use("/posts", postsRouter);

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
