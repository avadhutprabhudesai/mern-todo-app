import { Schema } from 'joi';

import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';

function joiMiddlware(joiSchema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const errorMessages = error.details.map((x) => x.message);
      return next(new createHttpError.BadRequest(errorMessages.join('')));
    }
    return next();
  };
}

export default joiMiddlware;
