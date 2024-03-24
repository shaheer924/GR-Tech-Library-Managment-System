import dotenv from 'dotenv'
import database from './utils/database.js'

// .env file
dotenv.config({path: './.env'})

import app from "./app.js";

// database connect
database()

// server start
app.listen(process.env.PORT, () => console.log("Server is listening on port", process.env.PORT))