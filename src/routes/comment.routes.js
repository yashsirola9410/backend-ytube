import {Router} from "express";

import {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}from "../controllers/comment.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();

router.get("/:videoId" , getVideoComments)
router.post("/:videoId",verifyJWT , addComment);
router.put("/:commentId" , verifyJWT , updateComment)
router.delete("/:commentId" , verifyJWT , deleteComment)

export default router ;