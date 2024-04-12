import mongoose, { Mongoose } from "mongoose";

const dassSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    depression_score: {
        type: Number,
        required: true
    },
    anxiety_score: {
        type: Number,
        required: true
    },
    stress_score: {
        type: Number,
        required: true
    },
    depression_label: {
        type: String,
        required: true
    },
    anxiety_label: {
        type: String,
        required: true
    },
    stress_label: {
        type: String,
        required: true
    },
}, { timestamps: true })

const dassModel = mongoose.model("Dass", dassSchema)
export default dassModel;