import mongoose from "mongoose";
const { isValidObjectId } = mongoose;

import Video from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Get All Videos
const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId } = req.query;

    const filters = {};

    if (query) {
        filters.$or = [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ];
    }

    if (userId && isValidObjectId(userId)) {
        filters.owner = userId;
    }

    const sortDirection = sortType === "asc" ? 1 : -1;
    const sortOptions = { [sortBy]: sortDirection };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const videos = await Video.find(filters)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .populate("owner", "username avatar");

    const total = await Video.countDocuments(filters);

    return res.status(200).json(
        new ApiResponse(200, {
            videos,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalVideos: total
        }, "Videos fetched successfully")
    );
});

// Publish Video
const publishVideo = asyncHandler(async (req, res) => {

    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    const { title, description, duration } = req.body;

    if (!title || !description || !duration) {
        throw new ApiError(400, "Title, description, and duration required.");
    }

    if (!req.files || !req.files.video || !req.files.thumbnail) {
        throw new ApiError(400, "Video and thumbnail files are required.");
    }

    const uploadVideo = await uploadOnCloudinary(req.files.video[0].path);
    if (!uploadVideo?.secure_url) {
        throw new ApiError(500, "Video upload failed");
    }

    const uploadThumbnail = await uploadOnCloudinary(req.files.thumbnail[0].path);
    if (!uploadThumbnail?.secure_url) {
        throw new ApiError(500, "Thumbnail upload failed");
    }

    const video = await Video.create({
        owner: req.user._id,
        title,
        description,
        videoFile: uploadVideo.secure_url,
        thumbnail: uploadThumbnail.secure_url,
        duration,
        isPublished: true
    });

    return res.status(201).json(new ApiResponse(201, video, "Video published successfully."));
});



// Get Video by ID
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId).populate("owner", "username avatar");

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(new ApiResponse(200, video, "Video fetched successfully"));
});



// Update Video
const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (title) video.title = title;
    if (description) video.description = description;

    if (req.files?.thumbnail) {
        const uploadThumbnail = await uploadOnCloudinary(req.files.thumbnail[0].path);
        if (uploadThumbnail?.secure_url) {
            video.thumbnail = uploadThumbnail.secure_url;
        }
    }

    await video.save();

    return res.status(200).json(new ApiResponse(200, video, "Video updated successfully"));
});

// Delete Video
const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    await Video.deleteOne({ _id: videoId });

    return res.status(200).json(new ApiResponse(200, {}, "Video deleted successfully"));
});

// Toggle Publish Status
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    video.isPublished = !video.isPublished;
    await video.save();

    return res.status(200).json(
        new ApiResponse(200, { isPublished: video.isPublished }, `Video ${video.isPublished ? "published" : "unpublished"} successfully`)
    );
});

export {
    getAllVideos,
    publishVideo,
    updateVideo,
    getVideoById,
    deleteVideo,
    togglePublishStatus
};
