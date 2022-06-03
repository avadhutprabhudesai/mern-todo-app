import express from 'express';
import authRouter from '../auth.router';
import ToDosRouter from '../todos.router';
// import jwtAuthMiddleware from '../../middlewares/auth/jwt-auth.middleware';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/todos', ToDosRouter);

export default v1Router;
