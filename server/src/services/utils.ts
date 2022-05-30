import { pbkdf2Sync, timingSafeEqual, randomBytes } from 'crypto';
import jwt, { Algorithm, SignOptions } from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { Payload, User } from '../typings/types';

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', 'private.pem'));

const encryptPassword = (p: string, salt = randomBytes(16).toString('hex')) => {
  const hash = pbkdf2Sync(p, salt, 100000, 64, 'SHA256').toString('hex');
  return [salt, hash];
};

const verifyPassword = (password: string, salt: string, hash: string) => {
  const [, derivedHash] = encryptPassword(password, salt);
  return timingSafeEqual(
    Buffer.from(hash, 'hex'),
    Buffer.from(derivedHash, 'hex')
  );
};

const issueJwt = (user: User) => {
  const expiresIn = 60 * 30;

  const payload: Payload = {
    sub: user._id,
    iat: Math.floor(Date.now() / 1000),
  };

  const algorithm: Algorithm = 'RS256';

  const options: SignOptions = {
    algorithm,
    expiresIn,
  };

  const signedToken = jwt.sign(payload, PRIVATE_KEY, options);
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

export { encryptPassword, verifyPassword, issueJwt };
