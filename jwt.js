const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // check request headers has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "NO token Found" });
  //  extracting Token
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    //  verifying token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  attach user info to request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

// token generating function
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 500 });
};
module.exports = { jwtAuthMiddleware, generateToken };
