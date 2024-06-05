import express from "express";
import multer from "multer";
import { body } from "express-validator";

import isAuth from "../middlewares/auth.js";
import {
  mainHeaderData,
  getUserProfile,
  findFriends,
  sendfriendRequest,
  sentfriendRequests,
  cancelfriendRequest,
  pendingfriendRequests,
  rejectfriendRequest,
  acceptfriendRequest,
  getuserfriends,
  getuserfriend,
  getBlockedUsers,
  updateProfilePic,
  updateProfile,
  blockUser,
  unBlockUser,
  removeFriend,
} from "../controllers/userController.js";
import { createNotificationAndSend } from "../controllers/notificationController.js";
import multerConfig from "../config/multerConfig.js";
import storage from "../config/cloudinary.js";

const upload = multer({
  storage: storage,
  fileFilter: multerConfig,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const router = express.Router();

router.get("/header-data", isAuth, mainHeaderData);

router.get("/profile", isAuth, getUserProfile);

router.post(
  "/update-profilePicture",
  isAuth,
  upload.single("profilePicture"),
  updateProfilePic
);

router.put(
  "/update-profile",
  isAuth,
  [
    body("userName", "Username must be min:4 characters in length")
      .trim()
      .isLength({ min: 4 }),
    body("gender", "Gender must not be empty").not().isEmpty(),
    body("bio", "Bio should not exceed 150 characters")
      .trim()
      .isLength({ max: 150 }),
  ],
  updateProfile
);

router.get("/find-friends/:searchedName", isAuth, findFriends);

router.post(
  "/send-friendrequest/:receiverId",
  isAuth,
  sendfriendRequest,
  createNotificationAndSend
);

router.get("/sent-friendrequests", isAuth, sentfriendRequests);

router.delete("/cancel-friendrequest/:receiverId", isAuth, cancelfriendRequest);

router.get("/pending-friendrequests", isAuth, pendingfriendRequests);

router.post(
  "/accept-friendrequest/:receiverId",
  isAuth,
  acceptfriendRequest,
  createNotificationAndSend
);

router.delete("/reject-friendrequest/:receiverId", isAuth, rejectfriendRequest);

router.get("/friend-profile/:friendId", isAuth, getuserfriend);

router.get("/friends", isAuth, getuserfriends);

router.get("/blocked-users", isAuth, getBlockedUsers);

router.put("/block-user/:friendId", isAuth, blockUser);

router.put("/unblock-user/:friendId", isAuth, unBlockUser);

router.delete("/remove-friend/:friendId", isAuth, removeFriend);

export default router;
