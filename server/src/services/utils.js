const { pbkdf2Sync, timingSafeEqual, randomBytes } = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', 'private.pem'));

const encryptPassword = (password, salt = randomBytes(16).toString('hex')) => {
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'SHA256').toString('hex');
  return [salt, hash];
};

const verifyPassword = (password, salt, hash) => {
  const [, derivedHash] = encryptPassword(password, salt);
  return timingSafeEqual(
    Buffer.from(hash, 'hex'),
    Buffer.from(derivedHash, 'hex')
  );
};

const issueJwt = (user) => {
  const expiresIn = 60 * 30;

  const payload = {
    sub: user._id,
    iat: Math.floor(Date.now / 1000),
  };

  const options = {
    algorithm: 'RS256',
    expiresIn,
  };

  const signedToken = jwt.sign(payload, PRIVATE_KEY, options);
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

module.exports = {
  encryptPassword,
  verifyPassword,
  issueJwt,
};
