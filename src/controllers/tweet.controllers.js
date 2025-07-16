import  {isValidObjectId} from "mongoose"
import Tweet from "../models/tweet.models.js"
import {ApiError}  from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req , res) => {
     const {content} = req.body;
     const userId = req.user?._id

     if(!content){
        throw new ApiError(400 , "Tweet content is required")
     }

     const tweet = await Tweet.create({
        content,
        owner : userId
     })

     return res.status(201).json(new ApiResponse(201 , tweet , "Tweet created succesfully"))
})




const getUserTweets = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    if(!isValidObjectId(userId)){
        throw new ApiError(400 , "Invalid user ID");
    }

    const tweets = await Tweet.find({owner : userId})
    .populate("owner" , "username name")
    .sort({createdAt : -1});

    return res.status(200).json(new ApiResponse(200 , tweets , "Fetched user tweets"))
})





const updateTweet = asyncHandler(async (req, res) => {
    const tweetId = req.params.tweetId;
    const {content} = req.body;

    if(!isValidObjectId(tweetId)){
      throw new ApiError(400 , "Invalid tweet Id");
    }

    const tweet = await Tweet.findById(tweetId);
    if(!tweet){
        throw new ApiError(404 , "Tweet not Found")
    }

    if(tweet.owner.toString()!== req.user?._id.toString()){
        throw new ApiError(403 , "Not authorized to update this tweet");
    }

    tweet.content = content  || tweet.content;
    await tweet.save();

    return res.status(200).json(new ApiResponse(200 , tweet , "Tweet updated successfully"))
})





const deleteTweet = asyncHandler(async (req, res) => {
    const tweetId = req.params.tweetId;

    if(!isValidObjectId(tweetId)){
        throw new ApiError(400 , "Invalid tweet ID")
    }

    const tweet = await Tweet.findById(tweetId);
    if(!tweet){
        throw new ApiError(404 ,  "Tweet not found ");
    }

    if(tweet.owner.toString()!== req.user?._id.toString()){
        throw new ApiError(403 ,  "Not authorized to delete this tweet")
    }
    await tweet.deleteOne();

    return res.status(200).json(new ApiResponse(200 , {} , "Tweet deleted successfully"))
})





export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}