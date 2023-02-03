const methods = ["body", "params", "headers", "query"];//To check all types of data access,four type just as "body", "params", "headers", "query"

const validation = (schema) => {
  return (req, res, next) => {
    let validationArray = [];
    methods.forEach((key) => {
      if (schema[key]) {
        const validationRes = schema[key].validate(req[key], {//validate on schema from struc for validation of any end poit
          abortEarly: false,//to handel all error 
        });

        if (validationRes?.error?.details) {//if any error push to array
          validationArray.push(validationRes.error.details);
        }
      }
    });
    if (validationArray.length > 0) {//if there an error reject req
      res.json({ message: "validation error ", err: validationArray });
    } else {
      next();//if no any error go to next operation
    }
  };
};
module.exports = { validation };//export function
