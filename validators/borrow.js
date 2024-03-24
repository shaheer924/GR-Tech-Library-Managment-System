import Joi from "joi";

// create record validator
const createRecord = Joi.object({
    bookId: Joi.string().required(),
    isReturned: Joi.boolean(),
    returnedDate: Joi.string().required()
})

export default {createRecord}