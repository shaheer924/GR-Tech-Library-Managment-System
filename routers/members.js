import express from "express";
import memberController from "../controllers/memberController.js";
import baseController from "../controllers/baseController.js";
import AuthenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const route = express.Router()

route.post('/', memberController.createMember)
route.post('/sign-in', memberController.memberSignIn)
route.use(AuthenticationMiddleware)
route.get('/', memberController.getAllMembers)
route.get('/:id', memberController.getMembersById)
route.put('/:id', memberController.updateMembers)


export default route