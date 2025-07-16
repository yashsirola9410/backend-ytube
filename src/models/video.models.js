import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming your user model is named 'User'
      required: true,
    },

    videoFile: {
      type: String,
      required: true,
    },  

    thumbnail: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    }
  },
  {timestamps: true} // Automatically adds createdAt and updatedAt 
);


videoSchema.plugin(mongooseAggregatePaginate)
const Video = mongoose.model("Video", videoSchema);

export default Video;
