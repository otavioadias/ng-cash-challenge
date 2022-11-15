import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required().min(3).messages({
    'string-empty': '"username" is required',
    'string-min': '"username" length must be at least 3 characters long', 
  }),
  password: Joi.string().required().min(8).messages({
    'string-empty': '"password" is required',
    'string-min': '"password" length must be at least 8 characters long',
  }),
});

export default {
    loginSchema,
}