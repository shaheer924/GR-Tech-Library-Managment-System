import appError from "../utils/appError.js";

const createRecord = (Model, validator) => {
    return async (req, res, next) => {
        try {
            let body = await validator.createRecord.validateAsync(req.body)

            let data = await Model.create(body)

            return apiResponse(res, 'Record created successfully', 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
}

const getAllRecords = (Model) => {
    return async (req, res, next) => {
        try {
            let data = await Model.find()

            return apiResponse(res, 'Record fetched successfully', 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
}

const getById = (Model) => {
    return async (req, res, next) => {
        try {
            let {id} = req.params

            let data = await Model.findById(id)

            if (!data) apiResponse(res, "No record found.", 200, data)

            return apiResponse(res, 'Record fetched successfully', 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
}

const deleteRecord = (Model) => {
    return async (req, res, next) => {
        try {
            let {id} = req.params

            let data = await Model.findByIdAndDelete(id)

            if (!data) apiResponse(res, "No record found.", 200, data)

            return apiResponse(res, 'Record deleted successfully', 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
}

const updateRecord = (Model, validator) => {
    return async (req, res, next) => {
        try {
            let {id} = req.params

            let body = await validator.updateRecord.validateAsync(req.body)

            let data = await Model.findByIdAndUpdate(id, body, {new: true})

            if (!data) apiResponse(res, "No record found.", 200, data)

            return apiResponse(res, 'Record updated successfully', 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
}

const apiResponse = (res, message, statusCode, data, pagination = undefined, token = undefined) => {
    res.status(statusCode).json({
        message, success: true, data, pagination, token
    })
}

export default {apiResponse, getAllRecords, getById, deleteRecord, updateRecord, createRecord}