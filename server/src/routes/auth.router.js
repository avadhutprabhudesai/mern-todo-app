const express = require('express');
const {
  httpRegisterUser,
  httpLogin,
} = require('../controllers/auth.controller');
const joiMiddlware = require('../middlewares/validators/joi.middlware');
const { UserSchema } = require('../middlewares/validators/joi-schemas');

const authRouter = express.Router();

authRouter.post('/register', joiMiddlware(UserSchema), httpRegisterUser);

authRouter.post('/login', joiMiddlware(UserSchema), httpLogin);

authRouter.use((err, req, res, next) => {
  let error = new Error(err);
  error.status = 400;
  return res.status(error.status).json({
    error: error.message,
  });
});

module.exports = authRouter;
