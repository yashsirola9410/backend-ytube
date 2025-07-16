import {isValidObjectId} from "mongoose"
import Like from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId = req.user._id

    if(!isValidObjectId(videoId)){
        throw new ApiError(400 , "Invalid video ID")
    }

    const result = await toggleLike({
        filter : {video : videoId},
        userId
    })
    return res.status(200).json(new ApiResponse(200 , result , `Video like toggled`))
    
})




const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const result = await toggleLike({
    filter: { comment: commentId },
    userId
  });

  return res.status(200).json(new ApiResponse(200, result, `Comment like toggled`));
})




const toggleTweetLike = asyncHandler(async (req, res) => {
     const { tweetId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet ID");
  }

  const result = await toggleLike({
    filter: { tweet: tweetId },
    userId
  });

  return res.status(200).json(new ApiResponse(200, result, `Tweet like toggled`));
})




const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const likedVideos = await Like.find({likedBy : userId , video : {$ne : null}})
    .populate("video" , "title url owner")
    .sort({createdAt : -1});

    return res.status(200).json(new ApiResponse(200 , likedVideos , "Fetched liked videos"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}