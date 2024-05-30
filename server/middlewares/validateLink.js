import User from "../models/user.js";
import verifyToken from "../utils/verifyToken.js";

const validateLink = async (req, res, next) => {
  const { userId } = req.params;
  const token = req.headers.authorization;
  try {
    //finding user in db
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Invalid user id!");
      error.statusCode = 401;
      throw error;
    }
    //verifying token
    const decoded = verifyToken(
      token,
      `ForgotPassword-Secret+${user.password}`
    );
    if (!decoded) {
      const error = new Error("Link expired go back and generate new link");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    next(err);
  }
};

export default validateLink;
