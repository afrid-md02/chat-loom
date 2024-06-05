import GeneralRoomMessage from "../models/generalRoomMessage.js";
import GeneralRoomMedia from "../models/generalRoomMedia.js";
import User from "../models/user.js";
import { io, userSocketMap } from "../app.js";

export const sendMesssage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const mediaUrl = req.file?.path;
    const { text, mediaType } = req.body;

    if (!mediaUrl && mediaType) {
      const error = new Error("Failed to upload media");
      error.statusCode = 400;
      throw error;
    }

    let newMessage;
    if (mediaUrl && text) {
      const media = await GeneralRoomMedia.create({
        mediaType,
        mediaUrl,
      });

      newMessage = await GeneralRoomMessage.create({
        senderId: userId,
        text: text.trim(),
        media: media._id,
      });
    } else if (mediaUrl) {
      const media = await GeneralRoomMedia.create({
        mediaType,
        mediaUrl,
      });

      newMessage = await GeneralRoomMessage.create({
        senderId: userId,
        media: media._id,
      });
    } else {
      newMessage = await GeneralRoomMessage.create({
        senderId: userId,
        text: text.trim(),
      });
    }

    const messageWithMedia = await newMessage.populate("media");

    const mediaArray = messageWithMedia.media ? [messageWithMedia.media] : [];

    const user = await User.findById(userId);
    const finalMessage = {
      senderId: messageWithMedia.senderId,
      text: messageWithMedia.text,
      media: mediaArray,
      createdAt: messageWithMedia.createdAt,
      senderName: user.userName,
      senderProfilePicture: user.profilePicture,
      updatedAt: messageWithMedia.updatedAt,
      _id: messageWithMedia._id,
    };

    // Emit the message to only online users
    const onlineUsers = Object.values(userSocketMap);
    onlineUsers.forEach((socketId) => {
      io.to(socketId).emit("newGeneralRoomMessage", finalMessage);
    });

    await res
      .status(201)
      .json({ message: "Message sent successfully", finalMessage });
  } catch (err) {
    next(err);
  }
};

export const getGeneralRoomMessage = async (req, res, next) => {
  try {
    const GeneralRoomMessagesByDay = await GeneralRoomMessage.aggregate([
      {
        $lookup: {
          from: "users", // Collection name for the User model
          localField: "senderId",
          foreignField: "_id",
          as: "sender", // Populate the senderId field
        },
      },
      {
        $addFields: {
          senderName: { $arrayElemAt: ["$sender.userName", 0] },
          senderProfilePicture: { $arrayElemAt: ["$sender.profilePicture", 0] },
        },
      },
      {
        $unset: "sender", // Remove the sender array
      },
      {
        $lookup: {
          from: "generalroommedias", // Collection name for the GeneralRoomMedia model
          localField: "media",
          foreignField: "_id",
          as: "media", // Populate the media field
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          messages: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    await res.status(200).json({ messages: GeneralRoomMessagesByDay });
  } catch (err) {
    next(err);
  }
};
