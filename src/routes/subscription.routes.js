import { Router } from "express";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels
} from "../controllers/subscription.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/toggle/:channelId").post(verifyJWT, toggleSubscription);
router.route("/channel/:channelId/subscribers").get(verifyJWT, getUserChannelSubscribers);
router.route("/user/:subscriberId/subscriptions").get(verifyJWT, getSubscribedChannels);

export default router;
