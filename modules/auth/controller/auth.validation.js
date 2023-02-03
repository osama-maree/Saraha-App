const Joi = require("joi");

const signUpv = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).max(15).required().messages({
        "any.required": "pleaze send name",
        "string.empty": "name is required",
      }),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(20).required(),
      cPassword: Joi.string().valid(Joi.ref("password")).required(),
      age: Joi.number(),
      profilePic: Joi.string(),
      gender: Joi.string(),
    }),
};
const signin = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required().messages({
        "any.required": "email. is required",
      }),
      password: Joi.string().required(),
    }),
};
const send1 = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required().messages({
        "any.required": "email. is required",
      }),
    }),
};
const validateToken = {
  params: Joi.object().required().keys({
    token: Joi.string().required(),
  }),
};
const forgetPassword = {
  body: Joi.object().required().keys({
    code: Joi.string().required(),
    email: Joi.string().email().required(),
    newPassword: Joi.string().required(),
  }),
};
module.exports = {
  signUpv,
  signin,
  send1,
  validateToken,
  forgetPassword
};
