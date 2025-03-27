require("dotenv").config();

const AUTH_KEY = process.env.AUTH_KEY;

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-auth-key"];

  if (!apiKey || apiKey !== AUTH_KEY) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};

module.exports = authMiddleware;
