import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    // Attempt to renew the token if the access token is not present
    const renewed = await renewToken(req, res);
    if (renewed) {
      return next(); // Call next() only if the token was renewed successfully
    } else {
      // Response is already handled in renewToken, no need to respond again
      return; 
    }
  } else {
    // Verify the access token
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        // Send an error response if the access token is invalid
        return res.status(403).json({
          valid: false,
          message: "Invalid access token",
        });
      } else {
        req.id = user.id;
        console.log('Authenticated user ID:', req.id);
        return next(); // Proceed to the next middleware or route handler
      }
    });
  }
};

const renewToken = (req, res) => {
  return new Promise((resolve) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      // Send a response if no refresh token is found and resolve as false
      res.status(403).json({ valid: false, message: "No refresh token" });
      return resolve(false);
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        // Send an error response if the refresh token is invalid
        res.status(403).json({
          valid: false,
          message: "Invalid refresh token",
        });
        return resolve(false);
      } else {
        // Generate a new access token
        const accessToken = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "15m" }
        );
        // Set the new access token in cookies
        res.cookie("accessToken", accessToken, {
          maxAge: 15 * 60 * 1000,
          httpOnly: true,
        });
        resolve(true); // Successfully renewed the token
      }
    });
  });
};

export { auth };

