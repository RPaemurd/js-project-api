import mongoose from "mongoose";

const userMessage = new mongoose.Schema({

    message: {
        type: String,
        required: true,
    },
    hearts: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, //mongoDB id
        ref: "User"
    }

}, { timestamps: true }
);

const Message = mongoose.model("Message", userMessage)

export default Message