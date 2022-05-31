import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { createUser, getUserByUsername } from '../models/user.model';
import { encryptPassword, issueJwt, verifyPassword } from '../services/utils';

const httpRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [salt, hash] = encryptPassword(req.body.password);
    const created = await createUser({
      username: req.body.username,
      salt,
      hash,
    });
    return res.status(201).json({
      success: true,
      user: created,
    });
  } catch (error) {
    next(new createHttpError.BadRequest('Unable to register'));
    return;
  }
};

const httpLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userFromDB = await getUserByUsername(req.body.username);
    if (!userFromDB) {
      return next(new createHttpError.NotFound('User not found'));
    }
    const token = issueJwt(userFromDB);
    const isPasswordMatching = verifyPassword(
      req.body.password,
      userFromDB.salt,
      userFromDB.hash
    );

    if (isPasswordMatching) {
      return res.status(200).json({
        success: true,
        user: userFromDB,
        ...token,
      });
    } else {
      return next(new createHttpError.Unauthorized('Login failed'));
    }
  } catch (error) {
    return next(
      new createHttpError.InternalServerError(
        'Server error occurred while loggin in'
      )
    );
  }
};
export { httpRegisterUser, httpLogin };
