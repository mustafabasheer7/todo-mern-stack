const jwt = require("jsonwebtoken");

const verifyJWTToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    // Taking the token from the auth header
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        res.status(401).json({
          message: "Invalid Token!",
          error: error.message,
        });
      }
      req.payload = payload;
      next();
    });
  } else {
    res.status(401).json({
      message: "You are not authorized to perform this action!",
    });
  }
};

const verifyJWTTokenAndAuth = (req, res, next) => {
  verifyJWTToken(req, res, () => {
    if (req.payload.id === req.params.id) {
      next();
    } else {
      res.status(403).json({
        message: "Not authorized or invalid data was entered!",
      });
    }
  });
};

module.exports = { verifyJWTToken, verifyJWTTokenAndAuth };
