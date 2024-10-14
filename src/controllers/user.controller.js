import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const generateAccessTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();

        await user.save({ validateBeforeSave: false });

        return { accessToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

export const test = asyncHandler(async (req, res, next) => {
    console.log("Working")
    return res.json({ data: "hello" })
})


// define avatar size in register user
export const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, username, password, confirmPassword, email, mobileNumber, dob } = req.body;

    if (!fullName || !username || !password || !email || !mobileNumber || !confirmPassword || !dob) {
        throw new ApiError(400, "All fields are required")
    }

    const mobileNumberMatch = await User.findOne({ mobileNumber });

    if (mobileNumberMatch) {
        throw new ApiError(400, "Mobile number already exists")
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Password and confirm password must be same")
    }

    const exixstedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (exixstedUser) {
        throw new ApiError(409, "User already exists with the username or email")
    }

    if (mobileNumber.length !== 10) {
        throw new ApiError(400, "Mobile number must be 10 digits")
    }

    // console.log(req.file)


    if (req.file?.size > 100000) {
        throw new ApiError(401, "Image size must be under 100kb")
    }



    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(500, "Something went wrong while uploading avatar to cloudinary");
    }

    const user = await User.create({
        fullName: fullName.trim(),
        // documentType,
        // documentNumber,
        dob,
        username: username.replace(/\s+/g, '').trim().toLowerCase(),
        password,
        email,
        mobileNumber,
        avatar: avatar.url,
        // securityQuestion: securityQuestion.trim().toLowerCase(),
        // securityAnswer: securityAnswer.trim().toLowerCase()
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user")
    }
    return res.status(200).json(new ApiResponse(200, createdUser, "User registered successfully"))

});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken } = await generateAccessTokens(user._id);


    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200).cookie("accessToken", accessToken, options).json(new ApiResponse(200, loggedInUser, "User logged in successfully"))

});

export const logoutUser = asyncHandler(async (req, res, next) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", options).json(new ApiResponse(200, {}, "User logged out successfully"))
});

export const updatePasswordThroughOTP = asyncHandler(async (req, res, next) => {
    const { email, newPassword, confirmPassword } = req.body;
    if (!newPassword || !confirmPassword) {
        throw new ApiError(400, "All fields are required")
    }

    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "Password and confirm password must be same")
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User not found with this email")
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(200, {}, "Password updated successfully"))
});

export const updateDuration = asyncHandler(async (req, res, next) => {
    const { duration } = req.body;

    if (!duration) {
        throw new ApiError(400, "Duration is required")
    }

    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(401, "User not found")
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "No such user found")
    }

    user.duration = duration;

    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(userId).select("-password")

    return res.status(200).json(new ApiResponse(200, updatedUser, "Duration updated successfully"))
})