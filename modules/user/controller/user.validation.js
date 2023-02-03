const Joi = require("joi");
const updatepass = {
  body: Joi.object().required().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};
module.exports={
    updatepass
}