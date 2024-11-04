import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken";

export const createAndSaveToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
};
