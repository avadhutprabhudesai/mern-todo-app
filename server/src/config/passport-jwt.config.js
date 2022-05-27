const fs = require('fs');
const path = require('path');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { getUserById } = require('../models/user.model');

const publicKey = fs.readFileSync(
  path.join(__dirname, '..', 'public.pem'),
  'utf-8'
);

const options = {
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
      done(error, false);
    }
  })
);
