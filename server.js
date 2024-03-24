import dotenv from 'dotenv'
import database from './utils/database.js'
dotenv.config({path: './.env'})

import app from "./app.js";

database()

app.listen(process.env.PORT, () => console.log("Server is listening on port", process.env.PORT))