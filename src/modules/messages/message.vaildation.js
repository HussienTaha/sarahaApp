import Joi from "joi";
import mongoose from "mongoose";

export const createMessageSchema = {
  body: Joi.object({
    content: Joi.string()
      .min(1)
      .required()
      .messages({
        "string.base": "Content must be a string",
        "string.empty": "Content cannot be empty",
        "string.min": "Content must be at least 1 character",
        "any.required": "Content is required"
      }),

    userId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
      .required()
      .messages({
        "any.invalid": "Invalid userId format",
        "any.required": "userId is required"
      })
  })
};
export const getMessageSchema = {
  params: Joi.object({
    id: Joi.string()
      .trim()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
      .required()
      .messages({
        "string.base": "Message ID must be a string",
        "string.empty": "Message ID cannot be empty",
        "any.invalid": "Invalid message ID format",
        "any.required": "Message ID is required"
      })
  })
};

// ✅ فلديشن لعرض الرسائل (مع pagination اختياري)
export const listMessagesSchema = {
  query: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .messages({
        "number.base": "Page must be a number",
        "number.min": "Page must be at least 1"
      }),
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10)
      .messages({
        "number.base": "Limit must be a number",
        "number.min": "Limit must be at least 1",
        "number.max": "Limit cannot be greater than 100"
      })
  })
};