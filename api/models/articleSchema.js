import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "https://media.istockphoto.com/id/1337766466/photo/man-suffering-depression-and-feeling-negative-emotions.jpg?s=612x612&w=0&k=20&c=6XL3vxDQ-8v5zgVaGqvafNl8cFGT4SCm2lki4rXawYc="
    },
    link: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'uncategorized',
        required: true
    }
})

const articleModel = mongoose.model("Article", articleSchema);
export default articleModel