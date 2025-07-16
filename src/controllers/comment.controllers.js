import mongoose from "mongoose"
import Comment from "../models/comment.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const aggregate = Comment.aggregate([
        { $match: { video: mongoose.Types.ObjectId(videoId) } },
        { $sort: { createdAt: -1 } }, // newest first
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },
        { $unwind: "$owner" },
        {
            $project: {
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                "owner._id": 1,
                "owner.username": 1,
                "owner.avatar": 1,
            },
        },
    ]);

    const options = {
        page,
        limit,
    };

    const result = await Comment.aggregatePaginate(aggregate, options);

    res.status(200).json(
        new ApiResponse(true, "Comments fetched successfully", {
            comments: result.docs,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            totalComments: result.totalDocs,
        })
    );
});




const addComment = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const  {content} = req.body ;
    const userId = req.user._id;

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400, "Invalid video ID");
    }

    if(!content || content.trim().length === 0){
        throw new ApiError(400 , "Comment text is required")
    }

    const newComment = new Comment({
        video : videoId,
        owner: userId,
        content: content.trim(),
    })

    await newComment.save();
    res.status(201).json(
        new ApiResponse(true , "Comment added succesfully", newComment)
    )
})




const updateComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    const {content} = req.body;
    const ownerId = req.user._id;

    if(!mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400 , " Invalid comment ID");
    }

    if(!content || content.trim().length === 0 ){
        throw new ApiError(400 , "Comment is required")
    }

    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404 , "Comment Not Found")
    }

    if(!comment.owner.equals(ownerId)){
        throw new ApiError(403 , " Not authorized to update this comment")
    }

    comment.content = content.trim();
    await comment.save();

    res.status(200).json(
        new ApiResponse(true , "Comment updated successfully" , comment )
    )
})




const deleteComment = asyncHandler(async (req, res) => {
     const { commentId } = req.params;
    const ownerId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    if (!comment.owner.equals(ownerId)) {
        throw new ApiError(403, "Not authorized to delete this comment");
    }

    await comment.remove();

    res.status(200).json(
        new ApiResponse(true, "Comment deleted successfully")
    );
})



export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }