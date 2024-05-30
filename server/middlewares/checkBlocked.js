import User from "../models/user.js";

const checkBlocked = async (req, res, next) => {
  try {
    const { userId } = req;
    const { friendId } = req.params;

    const user = await User.findById(userId);
    let errorMsg1;
    if (req.url === `/send/${friendId}`) {
      errorMsg1 = "You cannot send msg to blocked user";
    } else if (req.url === `/delete-conversationBtwUsers/${friendId}`) {
      errorMsg1 = "You cannot clear/delete conversation, unblock first.";
    }
    if (user.blocked.includes(friendId)) {
      const error = new Error(errorMsg1);
      error.statusCode = 400;
      throw error;
    }

    const friend = await User.findById(friendId);
    let errorMsg2;
    if (req.url === `/send/${friendId}`) {
      errorMsg2 = "You cannot send msg, because you were blocked.";
    } else if (req.url === `/delete-conversationBtwUsers/${friendId}`) {
      errorMsg2 =
        "You cannot clear/delete conversation, because you were blocked.";
    }
    if (friend.blocked.includes(userId)) {
      const error = new Error(errorMsg2);
      error.statusCode = 400;
      throw error;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkBlocked;
