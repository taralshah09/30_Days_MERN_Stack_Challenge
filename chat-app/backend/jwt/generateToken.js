import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();


const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "10d",
  });

  return res.cookie("jwt", token, {
    httpOnly: true, // xss
    secure: false, //true -> only https sites will receive the cookies but since its in development phase we will be using false
    sameSite: "strict", // csrf
  });
};

export { createTokenAndSaveCookie };

