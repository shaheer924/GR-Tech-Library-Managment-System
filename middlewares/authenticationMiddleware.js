import appError from "../utils/appError.js";
import jwt from 'jsonwebtoken'
import {raw} from "express";
import Members from "../models/Members.js";

const AuthenticationMiddleware = async (req, res, next) => {
    try {
        let authorization = req.headers.authorization
        let token
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1]
        }

        if (!token) return next(new appError('Auth token required', 401))

        let {id} = jwt.verify(token, process.env.JWT_STRING)

        let user = await Members.findById(id)

        if (!user) return next(new appError('unauthenticated', 401))

        req.user = user

        next()
    } catch (e) {
        return next(new appError(e?.message, 500))
    }
}

export default AuthenticationMiddleware