import { Router } from "express";

import {
   registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserChannelProfile,
  changeCurrentPassword,
  getWatchHistory,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multter.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router()
// /api/v1/healthcheck/test

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

//unsecured routes
router.route("/login").post(loginUser)

//secured routes 

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/passwordchange").post(verifyJWT, changeCurrentPassword)
router.route("/current_user").get(verifyJWT, getCurrentUser)
router.route("/update_acc").post(verifyJWT, updateAccountDetails)
router.route("/avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover_image").post(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router
