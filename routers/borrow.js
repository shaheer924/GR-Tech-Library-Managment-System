import express from "express";
import borrowController from "../controllers/borrowController.js";

const route = express.Router()

// borrowing Books
route.post('/', borrowController.borrowBook)

// returning borrow book
route.post('/return-book', borrowController.returnBook)

// books which I have borrowed
route.get('/my-borrowed-books', borrowController.myBorrowedBooks)

// books which I have returned
route.get('/my-borrowed-books-history', borrowController.myBorrowHistory)

export default route