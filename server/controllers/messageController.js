import cloudinary from "cloudinary";

import Conversation from "../models/conversation.js";
import User from "../models/user.js";
import Message from "../models/message.js";
import Media from "../models/media.js";

import extractPublicId from "../utils/extractPublicId.js";
import { io, getReceiverSocketid } from "../app.js";

export const sendMessage = async (req, res, next) => {
  try {
    const mediaUrl = req.file?.path;
    const userId = req.userId;
    const { friendId: receiverId } = req.params;
    const { text, mediaType } = req.body;

    if (userId === receiverId) {
      const error = new Error("User and receiver id's are same");
      error.statusCode = 400;
      throw error;
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, receiverId],
      });
    }

    if (!mediaUrl && mediaType) {
      const error = new Error("Failed to upload media");
      error.statusCode = 400;
      throw error;
    }

    let newMessage;
    if (mediaUrl && text) {
      const media = await Media.create({
        mediaType,
        mediaUrl,
      });

      newMessage = await Message.create({
        conversationId: conversation._id,
        senderId: userId,
        text: text.trim(),
        media: media._id,
      });
    } else if (mediaUrl) {
      const media = await Media.create({
        mediaType,
        mediaUrl,
      });

      newMessage = await Message.create({
        conversationId: conversation._id,
        senderId: userId,
        media: media._id,
      });
    } else {
      newMessage = await Message.create({
        conversationId: conversation._id,
        senderId: userId,
        text: text.trim(),
      });
    }

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    let populatedMessage;
    if (newMessage.media) populatedMessage = await newMessage.populate("media");
    else populatedMessage = newMessage;

    const receiverSocketId = await getReceiverSocketid(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    await res.status(201).json({
      message: "Message sent successfully",
      newMessage: populatedMessage,
    });
  } catch (err) {
    next(err);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { friendId } = req.params;

    //check if the friend is blocked or not
    const user = await User.findById(userId);
    if (user.blocked.includes(friendId)) {
      return await res
        .status(200)
        .json({ messages: [], info: `You blocked this user` });
    }

    //check if the user is blocked or not
    const friend = await User.findById(friendId);
    if (friend.blocked.includes(userId)) {
      return await res
        .status(200)
        .json({ messages: [], info: `You were blocked` });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, friendId] },
    }).populate({
      path: "messages",
      populate: {
        path: "media",
      },
    });

    if (!conversation) return await res.status(200).json({ messages: [] });

    const messages = conversation.messages;

    const messagesByDay = await Message.aggregate([
      {
        $match: {
          _id: { $in: messages.map((message) => message._id) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          messages: { $push: "$$ROOT" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    for (const day of messagesByDay) {
      for (const message of day.messages) {
        await Message.populate(message, { path: "media" });
      }
    }

    await res.status(200).json({ messages: messagesByDay });
  } catch (err) {
    next(err);
  }
};

export const deleteConversationBetweenUsers = async (req, res, next) => {
  try {
    // Find the conversation involving both users
    const { userId: userId1 } = req;
    const { friendId: userId2 } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId1, userId2] },
    }).populate("messages");

    if (!conversation) {
      const error = new Error("Conversation not found");
      error.statusCode = 404;
      throw error;
    }

    // Extract all message IDs and media IDs
    const messageIds = conversation.messages.map((message) => message._id);
    const mediaIds = conversation.messages
      .map((message) => message.media)
      .filter((mediaId) => mediaId);

    if (mediaIds.length !== 0) {
      const allMedias = await Media.find({ _id: { $in: mediaIds } });

      for (const mediaId of allMedias) {
        const media = await Media.findById(mediaId);
        const mediaUrl = media.mediaUrl;
        const { publicId, extension } = extractPublicId(mediaUrl);
        let resourceType;
        if (["jpg", "jpeg", "png"].includes(extension)) {
          resourceType = "image";
        } else if (extension === "svg") {
          resourceType = "raw";
        } else if (["mp4", "webm", "mov"].includes(extension)) {
          resourceType = "video";
        }

        const result = await cloudinary.v2.api.delete_resources(
          [publicId.replace("%", " ")],
          {
            type: "upload",
            resource_type: resourceType,
          }
        );

        if (Object.values(result.deleted).includes("not_found")) {
          const error = new Error("Failed to delete media");
          error.statusCode = 400;
          throw error;
        }
        await Media.deleteMany({ _id: { $in: mediaIds } });
      }
    }

    await Message.deleteMany({ _id: { $in: messageIds } });
    await Conversation.findByIdAndDelete(conversation._id);

    await res.status(200).json({ message: "Your chat has been deleted" });
  } catch (err) {
    next(err);
  }
};
