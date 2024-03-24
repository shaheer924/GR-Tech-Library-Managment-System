import mongoose from "mongoose";

// Book Schema
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date
    },
    genre: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Books = mongoose.model('books', BookSchema)

export default Books