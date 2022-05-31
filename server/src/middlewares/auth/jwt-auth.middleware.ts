import { NextFunction, Request, Response } from 'express';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import passport from 'passport';
import createHttpError from 'http-errors';

const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, user, status, info) => {
      if (
        status instanceof TokenExpiredError ||
        status instanceof JsonWebTokenError ||
        status instanceof NotBeforeError
      ) {
        return next(new createHttpError.Forbidden('Authentication failed'));
      }

      if (err) {
        return next(new createHttpError.Forbidden('Authentication failed'));
      }
      if (!user) {
        return next(new createHttpError.NotFound('Authentication failed'));
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export default jwtAuthMiddleware;
