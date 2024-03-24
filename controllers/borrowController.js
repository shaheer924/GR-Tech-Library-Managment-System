import baseController from "./baseController.js";
import Borrow from "../models/Borrow.js";
import borrow from "../validators/borrow.js";
import appError from "../utils/appError.js";
import Books from "../models/Books.js";
import mongoose from "mongoose";

// borrowing books
const borrowBook = async (req, res, next) => {
    try {
        let body = await borrow.createRecord.validateAsync(req.body)

        // find if this book is already borrows
        let borrowFind = await Borrow.findOne({userId: req?.user?._id, bookId: body?.bookId, isReturned: false})

        if (borrowFind) return next(new appError("You have already borrowed this book.", 400))

        // finding a book id available
        let bookFind = await Books.findById(body?.bookId)
        if (bookFind?.isAvailable === false) return next(new appError("Book is not available.", 400))

        // borrowing a book
        let data = await Borrow.create({bookId: body.bookId, userId: req?.user?._id, returnedDate: body.returnedDate})

        // book is not available after borrowed by a user
        await Books.findOneAndUpdate({_id: body.bookId}, {isAvailable: false})

        return baseController.apiResponse(res, "Book borrowed successfully", 200, data)
    } catch (e) {
        return next(new appError(e?.message, 500))
    }
}

// returning book
const returnBook = async (req, res, next) => {
    try {
        // finding if user has borrowed this book.
        let borrowFind = await Borrow.findOne({userId: req?.user?._id, bookId: req.body?.bookId, isReturned: false})

        if (!borrowFind) return next(new appError("No borrowed book found.", 400))

        // finding fine
        let returnDate = borrowFind?.returnedDate
        let currentDate = new Date()
        let diff = 0;
        if (returnDate < currentDate) {
            diff = currentDate - returnDate
        }
        // 100 rupees late fine per day
        let fineCharge = (diff / (1000 * 60 * 60 * 24)) * 100

        // returning a book
        let data = await Borrow.findOneAndUpdate({
            userId: req?.user?._id,
            bookId: req?.body.bookId,
            isReturned: false,
        }, {isReturned: true, fineCharge: fineCharge}, {new: true})

        // book is available after returning a borrowed book
        await Books.findOneAndUpdate({_id: req.body.bookId}, {isAvailable: true})

        return baseController.apiResponse(res, "Book borrowed successfully", 200, data)
    } catch (e) {
        return next(new appError(e?.message, 500))
    }
}

// books which user have borrowed
const myBorrowedBooks = async (req, res, next) => {
    try {
        let data = await Borrow.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req?.user?._id),
                    isReturned: false
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: {
                    path: '$book',
                    preserveNullAndEmptyArrays: true
                }
            }
        ])

        return baseController.apiResponse(res, "Record fetched successfully", 200, data)
    } catch (e) {
        return next(new appError(e?.message, 500))
    }
}

// books which are borrowed and returned
const myBorrowHistory = async (req, res, next) => {
    try {
        let data = await Borrow.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req?.user?._id),
                    isReturned: true
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: {
                    path: '$book',
                    preserveNullAndEmptyArrays: true
                }
            }
        ])

        return baseController.apiResponse(res, "Record fetched successfully", 200, data)
    } catch (e) {
        return next(new appError(e?.message, 500))
    }
}

export default {borrowBook, returnBook, myBorrowedBooks, myBorrowHistory}