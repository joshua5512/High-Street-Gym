import { Validator, ValidationError } from "express-json-validator-middleware";
import { response } from "express";
const validator = new Validator();

export const validate = validator.validate;

export const validateErrorMiddleware = (error, req, res, next) => {
  if(response.headersSent) {
    return next(error);
  }

  const isValidationError = error instanceof ValidationError;
  if(!ValidationError) {
    return next(error);
  }
  
  res.status(400).json({
    status: 400,
    message: "Validation error" + error,
    errors: error.validationErrors,
  })
}

