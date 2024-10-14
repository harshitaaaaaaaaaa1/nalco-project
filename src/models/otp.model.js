import mongoose, { Schema } from 'mongoose'

const otpSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        otp: {
            type: String,
        },
        expiresAt: {
            type: Date
        }
    },
    { timestamps: true }
);

export const OTP = mongoose.model("OTP", otpSchema)