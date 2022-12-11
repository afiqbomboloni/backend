const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.session.token;
  // const token = req.body.token || req.query.token || req.headers["x-access-token"]

  if (!token) {
    return res.status(403).send({
      message: "Token tidak tersedia",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
  // const token = req.session.token;
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]

  // jwt.verify(token, config.secret, (err, decoded) => {
  //   if(err) {
  //     return res.status(403).json({
  //       status: 'error',
  //       message: err.message
  //     })
  //   }
  //   req.user = decoded;
  //   return next()
  // })
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Silahkan validasi admin role",
    });
  }
};


isUserOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "user") {
        return next();
      }

      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require untuk admin dan user",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate user or Admin role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isUserOrAdmin,
};
module.exports = authJwt;
