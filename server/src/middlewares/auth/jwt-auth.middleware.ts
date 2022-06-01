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
      console.log('========jwt-auth-middleware');
      if (
        status instanceof TokenExpiredError ||
        status instanceof JsonWebTokenError ||
        status instanceof NotBeforeError
      ) {
        console.log('========jwt error');
        return next(new createHttpError.Forbidden('Authentication failed'));
      }

      if (err) {
        console.log('========err', err);
        return next(new createHttpError.Forbidden('Authentication failed'));
      }
      if (!user) {
        console.log('========user error');
        return next(new createHttpError.NotFound('Authentication failed'));
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export default jwtAuthMiddleware;
