const jwt = require("jsonwebtoken");

process.env.SECRET_KEY = "secret";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "48h" }
  );
};

const isAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "Token is not supplied" });
  }
};

const jwtAuth = { getToken, isAuth };
module.exports = jwtAuth;
