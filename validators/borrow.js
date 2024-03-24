import Joi from "joi";

const createRecord = Joi.object({
    bookId: Joi.string().required(),
    isReturned: Joi.boolean(),
    returnedDate: Joi.string().required()
})

export default {createRecord}