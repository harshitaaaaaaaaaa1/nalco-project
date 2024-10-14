import mongoose, { Schema } from 'mongoose'

const visitSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    page: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isBounce: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true });

export const Visit = mongoose.model("Visit", visitSchema);