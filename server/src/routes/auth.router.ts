import { ErrorRequestHandler } from 'express';

import express from 'express';
import { httpRegisterUser, httpLogin } from '../controllers/auth.controller';
import joiMiddlware from '../middlewares/validators/joi.middlware';
import { UserSchema } from '../middlewares/validators/joi-schemas';

const authRouter = express.Router();

authRouter.post('/register', joiMiddlware(UserSchema), httpRegisterUser);

authRouter.post('/login', joiMiddlware(UserSchema), httpLogin);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const error = new Error(err);
  return res.status(400).json({
    error: error.message,
  });
};
authRouter.use(errorHandler);

export default authRouter;
