import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide task name"],
        trim: true,
        maxlength: [20, "task name can not be more than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const task = mongoose.model("task", taskSchema)

export default task