const { validateJWT } = require("../helpers/jwt");
const { User } = require("../models/index");

const isAuth = async (req, res, next) => {
  const token = req.header["x-token"];

  const { uid, message, status } = validateJWT(token);

  if (status === false) {
    return res.status(403).json({
      status,
      message,
      data: {},
    });
  }

  const userExists = await User.findByPk(uid);

  if (!userExists) {
    return res.status(403).json({
      status: false,
      message: "User not exists",
      data: {},
    });
  }

  req.uid = uid;
  req.message = "User exists";
  req.status = true;

  next();
};

module.exports = { isAuth };