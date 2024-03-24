import Joi from "joi";

// create record validator
const createMemberValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required()
})

// update record validator
const updateRecord = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
})

// sign in validator
const memberSignInValidation = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required()
})

export default {createMemberValidation, memberSignInValidation, updateRecord}