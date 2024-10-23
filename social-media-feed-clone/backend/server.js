import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { router as passportAuthRouter } from "./routes/auth_passport.routes.js";
configDotenv();
import cors from "cors";
import passport from "passport";
import session from "express-session";

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

// Initialising the OAuth passport part
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", passportAuthRouter);

app.get("/auth/google/success", (req, res) => {
  res.redirect("http://localhost:3000/"); // Redirect to your React dashboard
});


app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
