import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
import { configDotenv } from "dotenv";
configDotenv()

const secureRoute = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
  
      if (!token) {
        return res.status(400).json({ error: "No token, authorization denied!" });
      }
  
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      if (!decoded) {
        return res.status(400).json({ error: "Invalid token!" });
      }
  
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
  
      req.user = user; // Attach user to the request
      next(); // Call next to move to the controller
    } catch (error) {
      console.log("Error in secured route: ", error);
      res.status(500).json({ error: "Internal server error!" });
    }
  };
  
export default secureRoute;