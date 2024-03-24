import Joi from "joi";

// create record validator
const createRecord = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publicationDate: Joi.string().required(),
    genre: Joi.string().required()
})

// update record validator
const updateRecord = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publicationDate: Joi.string().required(),
    genre: Joi.string().required()
})

export default {createRecord, updateRecord}