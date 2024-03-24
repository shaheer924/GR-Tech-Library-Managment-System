import appError from "../utils/appError.js";
import Members from "../models/Members.js";
import memberValidation from '../validators/member.js'
import baseController from "./baseController.js";
import jwt from "jsonwebtoken";

const createMember = async (req, res, next) => {
    try {
        //validation
        let body = await memberValidation.createMemberValidation.validateAsync(req.body)

        let memberFind = await Members.findOne({email: body?.email})

        if (memberFind) return next(new appError("Member already exist with this email", 400))

        let member = await Members.create(body)

        return baseController.apiResponse(res, "Member created successfully", 200, member)
    } catch (e) {
        return next(new appError(e?.message, 500))
    }
}

const memberSignIn = async (req, res, next) => {
    try {
        let body = await memberValidation.memberSignInValidation.validateAsync(req.body)

        let memberFind = await Members.findOne({email: body?.email}).select('+password')

        if (!memberFind) return next(new appError("No member found with this email", 400))

        let compare = await memberFind.comparePassword(body?.password, memberFind?.password)

        if (!compare) return next(new appError('Password is not correct', 400))

        let token = jwt.sign({id: memberFind?._id}, process.env.JWT_STRING, {
            expiresIn: '2d'
        })

        return baseController.apiResponse(res, "Member successfully signed in", 200, memberFind, undefined, token)

    } catch (e) {
        return next(new appError(e?.message, 500))
    }
}

const getAllMembers = baseController.getAllRecords(Members)

const updateMembers = baseController.updateRecord(Members, memberValidation)

const deleteMembers = baseController.deleteRecord(Members)

const getMembersById = baseController.getById(Members)

export default {memberSignIn, createMember, getAllMembers, updateMembers, deleteMembers, getMembersById}