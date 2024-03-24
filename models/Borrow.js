import mongoose from "mongoose";

// Borrow Schema
const BorrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'members'
    },
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: 'books'
    },
    isReturned: {
        type: Boolean,
        default: false
    },
    returnedDate: {
        type: Date
    },
    fineCharge: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Borrow = mongoose.model('borrow', BorrowSchema)

export default Borrow