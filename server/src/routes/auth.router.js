const express = require('express');
const { createUser, getUserByUsername } = require('../models/user.model');
const {
  encryptPassword,
  verifyPassword,
  issueJwt,
} = require('../services/utils');

const authRouter = express.Router();

authRouter.post('/register', async (req, res, next) => {
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
    next(`Error creating user. ${error.message}`);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const userFromDB = await getUserByUsername(req.body.username);
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
      next('User authentication failed');
    }
  } catch (error) {
    next(error.message);
  }
});

authRouter.use((err, req, res, next) => {
  let error = new Error(err);
  error.status = 400;
  return res.status(error.status).json({
    error: error.message,
  });
});

module.exports = authRouter;
