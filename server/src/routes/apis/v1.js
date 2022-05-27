const passport = require('passport');
const express = require('express');
const authRouter = require('../auth.router');
const ToDosRouter = require('../todos.router');

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use(
  '/todos',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    next();
  },
  ToDosRouter
);

module.exports = v1Router;
