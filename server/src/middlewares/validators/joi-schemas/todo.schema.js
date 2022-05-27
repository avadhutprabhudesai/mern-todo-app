const Joi = require('joi');

const TodoSchema = Joi.object().keys({
  title: Joi.string().required(),
  isDone: Joi.boolean().default(false),
});

module.exports = TodoSchema;
