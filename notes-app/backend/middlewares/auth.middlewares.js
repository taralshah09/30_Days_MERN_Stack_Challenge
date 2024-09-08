import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    const renewed = await renewToken(req, res);
    if (renewed) {
      return next();
    } else {
      return;
    }
  } else {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          valid: false,
          message: "Invalid access token",
        });
      } else {
        req.id = decoded.id;
        req.name = decoded.name;
        console.log("Authenticated user ID : ", req.id);
        return next();
      }
    });
  }
};

const renewToken = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(403).json({ valid: false, message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

    const accessToken = jwt.sign(
      { id: decoded.id, name: decoded.name },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ valid: true, message: "Token renewed successfully" });
  } catch (error) {
    return res
      .status(403)
      .json({ valid: false, message: "Invalid refresh token" });
  }
};

export default auth;

// Workflow :
// accessToken
// if(not) => renewToken => by making the use of refreshToken
// else => accessToken => next()
