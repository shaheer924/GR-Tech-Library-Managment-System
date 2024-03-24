import express from "express";
import bookController from "../controllers/bookController.js";

// initializing routing
const route = express.Router()

route.get('/', bookController.getAllBooks)

// Api for book search
route.get('/search', bookController.bookSearch)

route.get('/:id', bookController.getBookById)
route.put('/:id', bookController.updateBook)
route.post('/', bookController.createBook)
route.delete('/:id', bookController.deleteBook)


export default route