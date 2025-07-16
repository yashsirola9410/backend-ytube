import {Router} from "express";
import {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
} from "../controllers/video.controllers.js";

import {verifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multter.middlewares.js"


const router = Router();

router.route("/video").get(getAllVideos);

router.route("/publish").post(
    verifyJWT,
    upload.fields([
        {name : "video" , maxCount : 1},
        {name : "thumbnail" , maxCount :  1}
    ]),
    publishVideo
);

router.route("/:videoId").get(getVideoById);
router.route("/:videoupdate").patch(
  verifyJWT,
  upload.fields([
    { name: "thumbnail", maxCount: 1 }
  ]),
  updateVideo
);

router.route("/:videoId").delete(verifyJWT, deleteVideo);

router.route("/:videoId/toggle-publish").patch(verifyJWT, togglePublishStatus);

export default router;
