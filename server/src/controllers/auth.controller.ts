import { NextFunction, Request, Response } from 'express';
import { createUser, getUserByUsername } from '../models/user.model';
import { encryptPassword, issueJwt, verifyPassword } from '../services/utils';
import { User } from '../typings/types';

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
    next(`Error creating user. ${(error as Error).message}`);
    return;
  }
};

const httpLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userFromDB = (await getUserByUsername(req.body.username)) as User;
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
      return next('User authentication failed');
    }
  } catch (error) {
    return next((error as Error).message);
  }
};
export { httpRegisterUser, httpLogin };
