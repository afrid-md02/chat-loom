import express from "express";
import multer from "multer";

import isAuth from "../middlewares/auth.js";
import storage from "../config/cloudinary.js";
import multerConfig from "../config/multerConfig.js";
import {
  sendMesssage,
  getGeneralRoomMessage,
} from "../controllers/generalRoomController.js";

const upload = multer({
  storage: storage,
  fileFilter: multerConfig,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const router = express.Router();

router.post("/send-message", isAuth, upload.single("media"), sendMesssage);

router.get("/all-messages", isAuth, getGeneralRoomMessage);

export default router;
