import express from "express";
import bookController from "../controllers/bookController.js";

const route = express.Router()

route.get('/', bookController.getAllBooks)
route.get('/search', bookController.bookSearch)
route.get('/:id', bookController.getBookById)
route.put('/:id', bookController.updateBook)
route.post('/', bookController.createBook)
route.delete('/:id', bookController.deleteBook)


export default route