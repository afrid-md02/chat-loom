import cloudinary from "cloudinary";
import { validationResult } from "express-validator";

import User from "../models/user.js";
import Conversation from "../models/conversation.js";
import Media from "../models/media.js";
import Message from "../models/message.js";
import Notification from "../models/notification.js";

import extractPublicId from "../utils/extractPublicId.js";
import findResourceType from "../utils/resourceType.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    const userProfile = {
      _id: user._id,
      profilePicture: user.profilePicture,
      userName: user.userName,
      email: user.email,
      gender: user.gender,
      bio: user.bio,
      friends: user.friends.length,
      blocked: user.blocked.length,
    };

    await res.status(200).json(userProfile);
  } catch (err) {
    next(err);
  }
};

export const mainHeaderData = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    const notification = await Notification.find({ to: user._id });
    const unReadNotifications = notification.filter(
      (notification) => !notification.isRead
    );
    await res.status(200).json({
      _id: user._id,
      userName: user.userName,
      profilePicture: user.profilePicture,
      notifications: unReadNotifications.length,
    });
  } catch (err) {
    next(err);
  }
};

export const findFriends = async (req, res, next) => {
  try {
    const { userId } = req;
    const { searchedName } = req.params;

    const allUsers = await User.find({
      _id: { $ne: userId },
      friends: { $ne: userId },
    });

    const usersSearchedName = allUsers.filter((user) =>
      user.userName.includes(searchedName)
    );
    if (usersSearchedName.length === 0) {
      const error = new Error("No users found with given name");
      error.statusCode = 404;
      throw error;
    }

    const filteredUsers = usersSearchedName.map((user) => ({
      _id: user._id,
      userName: user.userName,
      profilePicture: user.profilePicture,
    }));

    await res.status(200).json({
      users: filteredUsers,
      message: "Here are the matched names",
    });
  } catch (err) {
    next(err);
  }
};

export const sendfriendRequest = async (req, res, next) => {
  try {
    const { userId } = req;
    const { receiverId } = req.params;

    const user = await User.findById(userId);

    if (user.sentRequests.includes(receiverId)) {
      const error = new Error(
        "You already sent a friend request to this user."
      );
      error.statusCode = 400;
      throw error;
    }

    const receiver = await User.findById(receiverId);

    user.sentRequests.push(receiverId);
    receiver.pendingRequests.push(userId);

    await user.save();
    await receiver.save();
    next();
  } catch (err) {
    next(err);
  }
};

export const sentfriendRequests = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).populate("sentRequests");
    const sentRequests = user.sentRequests.map((user) => ({
      _id: user._id,
      userName: user.userName,
      profilePicture: user.profilePicture,
    }));
    await res.status(200).json(sentRequests);
  } catch (err) {
    next(err);
  }
};

export const pendingfriendRequests = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).populate("pendingRequests");
    const pendingRequests = user.pendingRequests;
    await res.status(200).json(pendingRequests);
  } catch (err) {
    next(err);
  }
};

export const cancelfriendRequest = async (req, res, next) => {
  try {
    const { userId } = req;
    const { receiverId } = req.params;

    const user = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    user.sentRequests = user.sentRequests.filter(
      (id) => id.toString() !== receiverId
    );
    receiver.pendingRequests = receiver.pendingRequests.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await receiver.save();

    await res
      .status(202)
      .json({ message: "Friend request cancelled successfully" });
  } catch (err) {
    next(err);
  }
};

export const rejectfriendRequest = async (req, res, next) => {
  try {
    const { userId } = req;
    const { receiverId } = req.params;
    const user = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    user.pendingRequests = user.pendingRequests.filter(
      (id) => id.toString() !== receiverId
    );
    receiver.sentRequests = receiver.sentRequests.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await receiver.save();
    await res
      .status(202)
      .json({ message: "Friend request rejected successfully" });
  } catch (err) {
    next(err);
  }
};

export const acceptfriendRequest = async (req, res, next) => {
  try {
    const { userId } = req;
    const { receiverId } = req.params;
    const user = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    user.pendingRequests = user.pendingRequests.filter(
      (id) => id.toString() !== receiverId
    );
    receiver.sentRequests = receiver.sentRequests.filter(
      (id) => id.toString() !== userId
    );

    user.friends.push(receiverId);
    receiver.friends.push(userId);

    await user.save();
    await receiver.save();
    next();
  } catch (err) {
    next(err);
  }
};

export const getuserfriend = async (req, res, next) => {
  try {
    const { userId } = req;
    const { friendId } = req.params;
    const user = await User.findById(userId);
    const isBlocked = user.blocked.includes(friendId);
    const isFriend = user.friends.includes(friendId);
    const friendProfile = await User.findById(friendId);

    await res.status(200).json({ friendProfile, isBlocked, isFriend });
  } catch (err) {
    next(err);
  }
};

export const getuserfriends = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).populate("friends");
    const userFriends = user.friends.map((friend) => ({
      _id: friend._id,
      profilePicture: friend.profilePicture,
      userName: friend.userName,
    }));
    await res.status(200).json(userFriends);
  } catch (err) {
    next(err);
  }
};

export const getBlockedUsers = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).populate("blocked");
    const blockedUsers = user.blocked.map((blockedUser) => ({
      _id: blockedUser._id,
      profilePicture: blockedUser.profilePicture,
      userName: blockedUser.userName,
    }));
    await res.status(200).json(blockedUsers);
  } catch (err) {
    next(err);
  }
};

export const updateProfilePic = async (req, res, next) => {
  try {
    const profileUrl = req.file?.path;
    const { userId } = req;

    const user = await User.findById(userId);

    if (!profileUrl) {
      const error = new Error("Failed to upload profile picture");
      error.statusCode = 400;
      throw error;
    }

    if (profileUrl && user.profilePicture.includes("avatar.iran.liara.run")) {
      user.profilePicture = profileUrl;
    } else if (
      profileUrl &&
      !user.profilePicture.includes("avatar.iran.liara.run") &&
      user.profilePicture === profileUrl
    ) {
      user.profilePicture = profileUrl;
    } else if (profileUrl) {
      const { publicId, extension } = extractPublicId(user.profilePicture);
      const resourceType = findResourceType(extension);

      const result = await cloudinary.v2.api.delete_resources(
        [publicId.replace("%", " ")],
        {
          type: "upload",
          resource_type: resourceType,
        }
      );

      if (Object.values(result.deleted).includes("not_found")) {
        const error = new Error("Failed to delete previous profile picture");
        error.statusCode = 400;
        throw error;
      } else {
        user.profilePicture = profileUrl;
      }
    }

    await user.save();
    await res
      .status(201)
      .json({ profileUrl, message: "Profile picture updated" });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { userName, gender, bio } = req.body;

    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(userId);
    user.userName = userName;
    user.gender = gender;
    user.bio = bio;

    await user.save();
    await res.status(201).json({ message: "Profile updated" });
  } catch (err) {
    next(err);
  }
};

export const blockUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const { friendId } = req.params;

    //check if the user is already blocked or not
    const friend = await User.findById(friendId);
    if (friend.blocked.includes(userId)) {
      const error = new Error("You were already blocked");
      error.statusCode = 400;
      throw error;
    }

    //check if the friend is already blocked or not
    const user = await User.findById(userId);
    if (user.blocked.includes(friendId)) {
      const error = new Error("You already blocked this user");
      error.statusCode = 400;
      throw error;
    }

    user.blocked.push(friendId);
    await user.save();
    await res.status(201).json({ message: "Blocked the user successfully" });
  } catch (err) {
    next(err);
  }
};

export const unBlockUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const { friendId } = req.params;

    const user = await User.findById(userId);

    if (!user.friends.includes(friendId)) {
      const error = new Error("You are not friend with this user");
      error.statusCode = 400;
      throw error;
    }

    if (!user.blocked.includes(friendId)) {
      const error = new Error("You are not blocked this user");
      error.statusCode = 400;
      throw error;
    }

    user.blocked = user.blocked.filter((id) => id.toString() !== friendId);
    await user.save();
    await res.status(201).json({ message: "UnBlocked the user successfully" });
  } catch (err) {
    next(err);
  }
};

export const removeFriend = async (req, res, next) => {
  try {
    // Find the conversation involving both users
    const { userId: userId1 } = req;
    const { friendId: userId2 } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId1, userId2] },
    }).populate("messages");

    if (!conversation) {
      const user = await User.findById(userId1);
      user.friends = user.friends.filter((id) => id.toString() !== userId2);
      await user.save();

      const friend = await User.findById(userId2);
      friend.friends = friend.friends.filter((id) => id.toString() !== userId1);
      await friend.save();

      await Notification.deleteMany({
        $or: [
          {
            from: userId1,
            to: userId2,
          },
          {
            from: userId2,
            to: userId1,
          },
        ],
      });

      return await res
        .status(200)
        .json({ message: `Removed ${friend.userName} as a friend.` });
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
        if (
          extension === "jpg" ||
          extension === "jpeg" ||
          extension === "png"
        ) {
          resourceType = "image";
        } else if (extension === "svg") {
          resourceType = "raw";
        } else if (
          extension === "mp4" ||
          extension === "webm" ||
          extension === "mov"
        ) {
          resourceType = "video";
        }

        const result = await cloudinary.v2.api.delete_resources([publicId], {
          type: "upload",
          resource_type: resourceType,
        });

        if (Object.values(result.deleted).includes("not_found")) {
          const error = new Error(
            "Failed to clear your media, please try again"
          );
          error.statusCode = 400;
          throw error;
        }
        await Media.deleteMany({ _id: { $in: mediaIds } });
      }
    }
    await Message.deleteMany({ _id: { $in: messageIds } });
    await Conversation.findByIdAndDelete(conversation._id);

    const user = await User.findById(userId1);
    user.friends = user.friends.filter((id) => id.toString() !== userId2);
    await user.save();

    const friend = await User.findById(userId2);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId1);
    await friend.save();

    await Notification.deleteMany({
      $or: [
        {
          from: userId1,
          to: userId2,
        },
        {
          from: userId2,
          to: userId1,
        },
      ],
    });

    await res
      .status(200)
      .json({ message: `Removed ${friend.userName} as a friend.` });
  } catch (err) {
    next(err);
  }
};
