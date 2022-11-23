const jwt = require("jsonwebtoken");
// siehe https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const JWT_SECRET = "secret";

const verifyToken = (req, res, next) => {
  const token =
    req.headers["token"];
    console.log(token)
  if (!token) {
    return res.send(403);
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.send(401);
  }
  return next();
};

const createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET)
}

const auth = {
    verifyToken,
    createToken
}

module.exports = auth;