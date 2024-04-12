import mongoose, { Mongoose } from 'mongoose'

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    upvotes: {
        type: Array,
        default: [],
        required: true
    }

}, { timestamps: true })

const commentModel = mongoose.model('Comment', commentSchema)
export default commentModel