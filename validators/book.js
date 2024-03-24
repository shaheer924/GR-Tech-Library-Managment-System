import Joi from "joi";

const createRecord = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publicationDate: Joi.string().required(),
    genre: Joi.string().required()
})

const updateRecord = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publicationDate: Joi.string().required(),
    genre: Joi.string().required()
})

export default {createRecord, updateRecord}