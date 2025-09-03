import Joi from 'joi';
import { Types } from 'mongoose';

// ✅ Custom validation for ObjectId
export const customId = (value, helper) => {
  const isValid = Types.ObjectId.isValid(value);
  return isValid ? value : helper.message("Invalid ID format");
};

// ✅ General reusable validation rules
export const generalRules = {
  id: Joi.string().custom(customId).messages({
    'string.base': 'ID must be a string',
  }),

  email: Joi.string()
    .email({ tlds: { allow: true }, minDomainSegments: 2 })
    .messages({
      'string.email': 'Invalid email format',
    }),

  password: Joi.string().messages({
    'string.base': 'Password must be a string',
  }),

  headers: Joi.object({
    authorization: Joi.string().required(),
    host: Joi.string().required(),
    "accept-encoding": Joi.string().required(),
    "content-type": Joi.string().required(),
    "content-length": Joi.string().required(),
    connection: Joi.string().required(),
    "user-agent": Joi.string().required(),
    accept: Joi.string().required(),
    "cache-control": Joi.string().required(),
    "postman-token": Joi.string().required(),
  }) // عشان ميفشلش لو الهيدر فيه حاجات زيادة
};
