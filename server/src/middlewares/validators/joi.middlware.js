function joiMiddlware(joiSchema) {
  return (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const errorMessages = error.details.map((x) => x.message);
      return res.status(422).json({
        success: false,
        errors: errorMessages,
      });
    }
    next();
  };
}

module.exports = joiMiddlware;
