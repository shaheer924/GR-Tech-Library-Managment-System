import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    memberShipDate: {
        type: String
    },
    password: {
        type: String,
        select: false
    }
}, {
    timestamps: true
})

MemberSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

MemberSchema.methods.comparePassword = (password, compare_password) => {
    return bcrypt.compare(password, compare_password)
}

const Members = mongoose.model('members', MemberSchema)

export default Members