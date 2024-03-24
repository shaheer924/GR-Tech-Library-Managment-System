import baseController from "./baseController.js";
import Books from "../models/Books.js";
import Book from "../validators/book.js";
import appError from "../utils/appError.js";

const createBook = baseController.createRecord(Books, Book)
const getAllBooks = baseController.getAllRecords(Books)
const getBookById = baseController.getById(Books)
const updateBook = baseController.updateRecord(Books, Book)
const deleteBook = baseController.deleteRecord(Books)

const bookSearch = async (req, res, next) => {
    try {
        let {search} = req.query

        search = new RegExp(search, 'i')

        let data = await Books.aggregate([
            {
                $match: {
                    $or: [{title: search}, {author: search}]
                }
            }
        ])

        return baseController.apiResponse(res, 'Record fetched successfully', 200, data)
    } catch (e) {
        return next(new appError(e?.message, 500))
    }
}

export default {createBook, getAllBooks, getBookById, updateBook, deleteBook, bookSearch}