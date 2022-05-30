import passport from 'passport';
import express from 'express';
import authRouter from '../auth.router';
import ToDosRouter from '../todos.router';

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

export default v1Router;
