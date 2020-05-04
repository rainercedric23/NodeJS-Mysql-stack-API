import Joi from "@hapi/joi";
export const passwordReg = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/;
export default {
    signup: {
        email: Joi.string().email().required(),
        password: Joi.string().regex(passwordReg).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
    },
};
