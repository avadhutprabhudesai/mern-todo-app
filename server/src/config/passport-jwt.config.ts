import fs from 'fs';
import path from 'path';
import passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { getUserById } from '../models/user.model';
import createHttpError from 'http-errors';

const publicKey = fs.readFileSync(
  path.join(__dirname, '..', 'public.pem'),
  'utf-8'
);

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256'],
};

passport.use(
  new JWTStrategy(options, async function verify(payload, done) {
    try {
      const user = await getUserById(payload.sub);
      done(null, user);
    } catch (error) {
      done(new createHttpError.Forbidden('Authorization failed'), false);
    }
  })
);
