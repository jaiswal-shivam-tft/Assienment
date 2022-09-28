const Joi = require('joi');

errorFucntion = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.json({ message: error.details[0].message });
    return console.log(error.details[0].message);
  } else {
    return next();
  }
};

//signUp validation
// Regstration Validation
module.exports.signUpValidation = async function (req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).trim().required(),
    lastName: Joi.string().min(3).max(20).trim().required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),

    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(6).max(10).required(),
    role: Joi.string(),
  });
  errorFucntion(schema, req, res, next);
};

//login validation
// login validation
module.exports.loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'in'] },
      }),
    password: Joi.required(),
  });
  errorFucntion(schema, req, res, next);
};
