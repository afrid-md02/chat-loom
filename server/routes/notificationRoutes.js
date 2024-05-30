import express from "express";

import isAuth from "../middlewares/auth.js";
import {
  getallNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/all-notifications", isAuth, getallNotifications);

router.put("/mark-asread", isAuth, markAsRead);

router.delete("/delete/:notificationId", isAuth, deleteNotification);

export default router;
