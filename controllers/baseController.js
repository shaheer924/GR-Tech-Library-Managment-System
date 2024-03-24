import appError from "../utils/appError.js";

// create record
const createRecord = (Model, validator) => {
    return async (req, res, next) => {
        try {
            // validating request body
            let body = await validator.createRecord.validateAsync(req.body)

            // creating record
            let data = await Model.create(body)

            // responding
            return apiResponse(res, 'Record created successfully', 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
}

// fetch all records
const getAllRecords = (Model) => {
    return async (req, res, next) => {
        try {
            // find record with query if given
            let data = await Model.find(req.query)

            return apiResponse(res, 'Record fetched successfully', 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
}

// fetch records by id
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

// delete record by id
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

// update record by id
const updateRecord = (Model, validator) => {
    return async (req, res, next) => {
        try {
            let {id} = req.params

            // validating request body
            let body = await validator.updateRecord.validateAsync(req.body)

            let data = await Model.findByIdAndUpdate(id, body, {new: true})

            if (!data) apiResponse(res, "No record found.", 200, data)

            return apiResponse(res, 'Record updated successfully', 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
}

// base response for all controllers
const apiResponse = (res, message, statusCode, data, pagination = undefined, token = undefined) => {
    res.status(statusCode).json({
        message, success: true, data, pagination, token
    })
}

export default {apiResponse, getAllRecords, getById, deleteRecord, updateRecord, createRecord}