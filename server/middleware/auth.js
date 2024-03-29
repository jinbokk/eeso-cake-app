const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) {
      return res.status(200).json({
        isAuth: false,
        err: err,
      });
    }

    if (!user) {
      return res.status(200).json({
        isAuth: false,
        err: err,
      });
    }

    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = { auth };
