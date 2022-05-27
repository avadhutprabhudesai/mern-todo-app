const Joi = require('joi');

const UserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = UserSchema;
