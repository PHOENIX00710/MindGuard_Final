import mongoose from 'mongoose'

const savedArticleSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Types.ObjectId,
        required: true
    },
    article:
    {
        type: mongoose.Types.ObjectId,
        required: true
    },
}, { timestamps: true })

const savedArticleModel= mongoose.model('Saved_Article',savedArticleSchema)
export default savedArticleModel