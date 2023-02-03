const methods = ["body", "params", "headers", "query"];

const validation = (schema) => {
  return (req, res, next) => {
    let validationArray = [];
    methods.forEach((key) => {
      if (schema[key]) {
        const validationRes = schema[key].validate(req[key], {
          abortEarly: false,
        });

        if (validationRes?.error?.details) {
          validationArray.push(validationRes.error.details);
        }
      }
    });
    if (validationArray.length > 0) {
      res.json({ message: "validation error ", err: validationArray });
    } else {
      next();
    }
  };
};
module.exports = { validation };
