import express from 'express';
import { httpRegisterUser, httpLogin } from '../controllers/auth.controller';
import joiMiddlware from '../middlewares/validators/joi.middlware';
import { UserSchema } from '../middlewares/validators/joi-schemas';

const authRouter = express.Router();

authRouter.post('/register', joiMiddlware(UserSchema), httpRegisterUser);

authRouter.post('/login', joiMiddlware(UserSchema), httpLogin);

export default authRouter;
