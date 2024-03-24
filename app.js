import express from 'express'
import morgan from "morgan";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import appError from "./utils/appError.js";
import router from "./routers/index.js";

const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))

//router
app.use('/api', router)

app.all('*', (req, res, next) => next(new appError(`No route found on this server`, 404)))
app.use(errorHandlerMiddleware)

export default app