import {Router} from "express"

import {
     createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist
} from "../controllers/playlist.controllers.js"

import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/create").post(verifyJWT, createPlaylist);
router.route("/user/:userId").get(verifyJWT, getUserPlaylists);
router.route("/:playlistId").get(verifyJWT, getPlaylistById);
router.route("/:playlistId").delete(verifyJWT, deletePlaylist);
router.route("/:playlistId").put(verifyJWT, updatePlaylist);
router.route("/:playlistId/video/:videoId").post(verifyJWT, addVideoToPlaylist);
router.route("/:playlistId/video/:videoId").delete(verifyJWT, removeVideoFromPlaylist);



export default router;