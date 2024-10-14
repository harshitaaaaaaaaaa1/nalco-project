import { User } from "../models/user.model.js";
import { Visit } from "../models/visit.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getMonthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1)

export const getAnalytics = asyncHandler(async (req, res, next) => {
    const now = new Date();
    const monthStart = getMonthStart(now);

    // const totalVisits = await Visit.countDocuments();

    const totalMonthlyVisits = await User.countDocuments({
        createdAt: {
            $gte: monthStart
        }
    });

    const totalDuration = await User.aggregate([
        {
            $group: {
                _id: null,
                totalDuration: {
                    $sum: '$duration'
                }
            }
        }
    ])

    const totalUsers = await User.countDocuments();

    const totalBounces = await Visit.countDocuments({ isBounce: true });

    const perPageVisits = await Visit.aggregate([
        { $group: { _id: { page: '$page', userId: '$userId' }, uniqueVisits: { $sum: 1 } } },
        { $group: { _id: '$_id.page', visits: { $sum: 1 } } }
    ]);

    const averageVisitDuration = (totalDuration[0]?.totalDuration / totalUsers || 0).toFixed(2);

    const bounceRate = (totalBounces / totalUsers || 0) * 100;

    return res.status(200).json(new ApiResponse(200,
        {
            totalVisits: totalUsers,
            bounceRate,
            totalMonthlyVisits,
            perPageVisits: perPageVisits.length,
            averageVisitDuration
        },
        "Analytics fetched successfully"
    ))
});

export const addVisit = asyncHandler(async (req, res, next) => {
    const { page, isBounce } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (!page) {
        throw new ApiError(400, "All fields are required")
    }

    const doesVisitExist = await Visit.findOne({ page, user: userId });

    if (doesVisitExist) {
        return res.status(200).json(new ApiResponse(200, doesVisitExist, "Visit already exists"));
    }
    const newVisit = await Visit.create({
        page,
        isBounce,
        user: userId
    });

    return res.status(200).json(new ApiResponse(200, newVisit, "Visit added successfully"))
})

export const toggleBounce = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    const updateBounce = await Visit.updateMany({ user: userId }, {
        $set: {
            isBounce: false
        }
    });

    return res.status(200).json(new ApiResponse(200, updateBounce, "Bounce toggled successfully"))
})