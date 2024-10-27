import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

export const createTokenAndSave = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, //because in development mode
    sameSite: "strict",
  });
};
    