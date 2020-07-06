const jwt = require("jsonwebtoken");
require("dotenv/config");
module.exports = (req, res, next) => {
  //if (req.user === undefined) return res.status(404).send({ msg: "User not loggedin" });
  if (req.header("Authorization") == undefined) {
    const token = req.query.access_token;
    if (!token)
      return res
        .status(401)
        .json({ msg: "Access denied.No Authorization token" });
    try {
      console.log("valid ");
      const valid = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {};
      req.user.id = valid._id;
      req.user.email = valid.email;
      next();
    } catch (ex) {
      console.log("valid not");
      res.status(400).json({ msg: "Invalid Access token" });
    }
  } else {
    const token = req.header("Authorization").split(" ")[1];
    if (!token)
      return res
        .status(401)
        .send({ msg: "Access denied.No Authorization token" });
    try {
      const valid = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {};
      req.user.id = valid._id;
      req.email = valid.email;
      next();
    } catch (ex) {
      console.log(ex);
      res.status(400).json({ msg: "Invalid Access token" });
    }
  }
};
