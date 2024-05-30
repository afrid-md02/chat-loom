import User from "../models/user.js";
import verifyToken from "../utils/verifyToken.js";

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = verifyToken(token, process.env.JWT_LOGINSECRET);
    if (!decoded) {
      const error = new Error("Session expired, login again");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    next(err);
  }
};

export default isAuth;
