import express from "express";
import members from "./members.js";
import books from "./books.js";
import borrow from "./borrow.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = express.Router()

router.use('/member', members)

// authentication middleware
router.use(authenticationMiddleware)

// handling routes for books and borrow
router.use('/book', books)
router.use('/borrow', borrow)

export default router