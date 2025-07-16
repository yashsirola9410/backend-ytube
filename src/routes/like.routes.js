import {Router} from "express"

import {
      toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos
} from "../controllers/likes.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router();

router.post("/video/:videoId" , verifyJWT , toggleVideoLike);
router.post("/comment/:commentId" , verifyJWT , toggleCommentLike);
router.post("/tweet/:tweetId" , verifyJWT , toggleTweetLike);

router.get("videos/:tweetId" , verifyJWT ,getLikedVideos)

export default router;