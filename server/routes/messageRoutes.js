import express from "express";
import multer from "multer";

import isAuth from "../middlewares/auth.js";
import checkBlocked from "../middlewares/checkBlocked.js";
import storage from "../config/cloudinary.js";
import multerConfig from "../config/multerConfig.js";

import {
  sendMessage,
  getConversation,
  deleteConversationBetweenUsers,
} from "../controllers/messageController.js";

const router = express.Router();
const upload = multer({
  storage: storage,
  fileFilter: multerConfig,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post(
  "/send/:friendId",
  isAuth,
  checkBlocked,
  upload.single("media"),
  sendMessage
);

router.get("/conversation/:friendId", isAuth, getConversation);

router.delete(
  "/conversation-btw-users/:friendId",
  isAuth,
  checkBlocked,
  deleteConversationBetweenUsers
);

export default router;
