import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import "./passport/auth.js";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as transactionRouter } from "./routes/transaction.routes.js";
import session from "express-session";

const app = express();

mongoose.connect(
  "mongodb+srv://root:root@cluster0.ck82n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS with credentials
app.use(
  cors({
    origin: "http://localhost:3000", // Change this for production
    credentials: true,
  })
);

// Configure session management
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);

// Route for Google OAuth success redirect
app.get("/auth/google/success", (req, res) => {
  res.redirect("http://localhost:3000/"); // Redirect to your React dashboard
});

app.listen(process.env.PORT, () =>
  console.log("Server running on PORT:", process.env.PORT)
);
