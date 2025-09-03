  import Joi from "joi";
import { UserGender } from "../../DB/models/user.model.js";
import { MIME_GROUPS } from "../../middleware/multer.js";

 export const userValidationSchema ={body: Joi.object({
  Name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'User name is required',
      'any.required': 'User name is required',
    }),

  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required',
    }),
    confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm password must match password',
      'any.required': 'Confirm password is required',
    }),

  gender: Joi.string()
    .valid(UserGender.male, UserGender.female)
    .messages({
      'any.only': 'Gender must be either male or female',
    }).required(),

  phone: Joi.string()
     .pattern(/^01[0125][0-9]{8}$/)
    .messages({
      'string.pattern.base': 'Phone must be a valid number (10-15 digits)',
    }).required(),

  image: Joi.string().uri().messages({
    'string.uri': 'Image must be a valid URL',
  }),

  age: Joi.number()
    .min(10)
    .max(100)
    .messages({
      'number.min': 'Age must be at least 10',
      'number.max': 'Age must be less than or equal to 100',
    }),
    role: Joi.string()
  .valid('user', 'admin')
  .default('user')
  .messages({
    'any.only': 'Role must be either user or admin',
  }),


  confirmed: Joi.boolean(),
query: Joi.object(
    {
        flag: Joi.number().integer().min(1).default(10),
    }
)
,headers: Joi.object({
    authorization: Joi.string().required(),
    host: Joi.string().required(),
    'accept-encoding': Joi.string().required(),
    'content-type': Joi.string().required(),
    'content-length': Joi.string().required(),
    connection: Joi.string().required(),
    'user-agent': Joi.string().required(),
    accept: Joi.string().required(),
    'cache-control': Joi.string().required(),
    'postman-token': Joi.string().required()
  }).unknown(true),
file:Joi.object({
  originalname: Joi.string().required(),
  mimetype: Joi.string().valid(MIME_GROUPS).required(),
  size: Joi.number().max(5 * 1024 * 1024).required(), // 5MB
})

})}
export const signinuserValidationSchema = {
  body: Joi.object({
    email: Joi.string()
      .trim()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
      }),

    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters',
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
      }),
  })
};
export const updatePasswordSchema = {
 body: Joi.object({
    oldPassword: Joi.string().min(6).required().messages({
      "any.required": "Old password is required",
      "string.min": "Old password must be at least 6 characters"
    }),
    newPassword: Joi.string().min(6).required().messages({
      "any.required": "New password is required",
      "string.min": "New password must be at least 6 characters"
    }), confirmPassword: Joi.any()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Confirm password must match password',
      'any.required': 'Confirm password is required',
    }),

  })

}
export const verifyOtpValidationSchema = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required"
      }),
    
  })
};
export const verifyOtpValidationSchemaa = {
  body: Joi.object({

    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required(),
    newPassword: Joi.string().min(6).required()
  })
};
export const updateProfileValidationSchema = {
  body: Joi.object({
    Name: Joi.string().optional(),
    age: Joi.number().min(10).max(100).optional(),
    gender: Joi.string().valid("male", "female").optional(),
    phone: Joi.string().optional(),
    image: Joi.string().optional(),
    email: Joi.string() .email().optional(),
  }),
};
export const freezeProfileValidationSchema = {
  params: Joi.object({
    id: Joi.string().length(24).optional().messages({
      'string.base': 'ID must be a string',
      'string.length': 'Invalid ID length',
    }),
  }),
};
export const unfreezeProfileValidationSchema = {
  params: Joi.object({
    id: Joi.string().length(24).optional().messages({
      'string.base': 'ID must be a string',
      'string.length': 'Invalid ID length',
    }),
  }),
};
export const updateImageValidationSchema = {
  file: Joi.object({
    originalname: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/webp")
      .required()
      .messages({
        "any.only": "Invalid file type. Only jpeg, png, webp allowed",
      }),
    size: Joi.number()
      .max(2 * 1024 * 1024) // 2MB
      .required()
      .messages({
        "number.max": "File too large. Max size is 2MB",
      }),
  }),
};
