var jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "DUNIYAMAIKYACHALRAHAHAIAJKAL";

const fetchuser = (req, res, next) => {
  // get user from jwt token and add user id to request

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
