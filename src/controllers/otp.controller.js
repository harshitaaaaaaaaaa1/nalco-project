import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateOTP } from "../utils/generateOTP.js";
import { hashData, verifyHashedData } from "../utils/hashData.js";
import { sendEmail } from "../utils/sendEmail.js";


export const sendOTP = asyncHandler(async (req, res, next) => {
    const { email, subject = "Email verification", message = "Please verify your email", duration = 1 } = req.body;

    if (!(email && subject && message)) {
        throw new ApiError(400, "All fields are required");
    }

    const isEmailValid = await User.findOne({ email });

    if (!isEmailValid) {
        throw new ApiError(400, "User not found with this email")
    }

    await OTP.deleteOne({ email });

    const generatedOTP = await generateOTP();

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject,
        html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`
    };

    await sendEmail(mailOptions);

    const hashedOTP = await hashData(generatedOTP.toString());
    // console.log(generatedOTP)
    // const hashedOTP = bcrypt.hashSync(generatedOTP.toString(), 10)
    const newOTP = await OTP.create({
        email,
        otp: hashedOTP,
        expiresAt: Date.now() + 3600000 * +duration,
    });

    // const otpDetails = await OTP.findById(newOTP._id).select("-otp");

    return res.status(200).json(new ApiResponse(200, newOTP, "OTP sent successfully"));
});

export const verifyOTP = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!(email && otp)) {
        throw new ApiError(400, "All fields are required");
    }

    const matchedOTPRecord = await OTP.findOne({
        email
    });

    if (!matchedOTPRecord) {
        throw new ApiError(400, "Invalid OTP");
    }

    const { expiresAt } = matchedOTPRecord;

    if (expiresAt < Date.now()) {
        await OTP.deleteOne({ email });
        throw new ApiError(400, "OTP expired");
    }

    const hashedOTP = matchedOTPRecord.otp;
    const validOTP = await verifyHashedData(otp.toString(), hashedOTP);

    if (!validOTP) {
        throw new ApiError(400, "Invalid OTP");
    }

    await OTP.deleteOne({ email });
    return res.status(200).json(new ApiResponse(200, validOTP, "OTP verified successfully"));
})