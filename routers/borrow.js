import express from "express";
import borrowController from "../controllers/borrowController.js";

const route = express.Router()

route.post('/', borrowController.borrowBook)
route.post('/return-book', borrowController.returnBook)
route.get('/my-borrowed-books', borrowController.myBorrowedBooks)
route.get('/my-borrowed-books-history', borrowController.myBorrowHistory)

export default route