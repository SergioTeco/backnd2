const { request, response } = require('express');
const { passport } = require('passport');

export const passportCall = (strategy) => {
  return async (req = request, res = response, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ status: "error", msg: info.message });

      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = { passportCall };