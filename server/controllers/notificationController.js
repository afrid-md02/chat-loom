import Notification from "../models/notification.js";
import User from "../models/user.js";

export const getallNotifications = async (req, res, next) => {
  try {
    const { userId } = req;
    const allNotifications = await Notification.find({ to: userId });
    await res.status(200).json(allNotifications.reverse());
  } catch (err) {
    next(err);
  }
};

export const createNotificationAndSend = async (req, res, next) => {
  try {
    const { userId } = req;
    const { receiverId } = req.params;
    const { notificationType } = req.body;

    let content;
    let message;
    if (notificationType === "friendRequest") {
      const user = await User.findById(userId);
      content = `${user.userName} sent you a friend request`;
      message = "Friend request sent successfully";
    } else if (notificationType === "friendRequestAccepted") {
      const user = await User.findById(userId);
      content = `${user.userName} accepted your friend request`;
      message = "Friend request accepted successfully";
    }

    const newNotification = await Notification.create({
      type: notificationType,
      from: userId,
      to: receiverId,
      content,
    });

    await res.status(201).json({
      newRequest: newNotification,
      message: message,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { notificationId } = req.body;

    const notification = await Notification.findById(notificationId);
    notification.isRead = true;
    await notification.save();
    await res.status(201).json({
      message: "Notification marked as read",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const result = await Notification.findByIdAndDelete(notificationId);
    await res.status(201).json({
      message: "Notification deleted successfully",
      result,
    });
  } catch (err) {
    next(err);
  }
};
