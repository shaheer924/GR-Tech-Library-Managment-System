import Joi from "joi";

const createMemberValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required()
})

const updateRecord = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
})

const memberSignInValidation = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required()
})

export default {createMemberValidation, memberSignInValidation, updateRecord}