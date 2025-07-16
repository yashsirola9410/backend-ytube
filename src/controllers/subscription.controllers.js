import { isValidObjectId } from "mongoose";
import Subscription from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const subscriberId = req.user._id; 

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    if (subscriberId.toString() === channelId) {
        throw new ApiError(400, "You cannot subscribe to yourself");
    }

    const existing = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId
    });

    if (existing) {
        await existing.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Unsubscribed successfully"));
    } else {
        await Subscription.create({
            subscriber: subscriberId,
            channel: channelId
        });
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Subscribed successfully"));
    }
});





const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const subscribers = await Subscription.find({ channel: channelId }).populate("subscriber", "username email");

    return res
        .status(200)
        .json(new ApiResponse(200, subscribers, "Fetched subscribers successfully"));
});





const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID");
    }

    const channels = await Subscription.find({ subscriber: subscriberId }).populate("channel", "username email");

    return res
        .status(200)
        .json(new ApiResponse(200, channels, "Fetched subscribed channels successfully"));
});





export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
};
