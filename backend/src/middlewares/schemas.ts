import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required().min(3).messages({
    'string-empty': '"username" is required',
    'string-min': '"username" length must be at least 3 characters long', 
  }),
  password: Joi.string().required().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/).messages({
    'string-empty': '"password" is required',
    'string-regex': 'The password must contain at least 1 uppercase letter, 1 number, 1 lowercase letter and at least 8 characters',
  }),
});

export default {
    loginSchema,
}