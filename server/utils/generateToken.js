import jwt from "jsonwebtoken";

const generateToken = (userId, secret, expiresIn) => {
  return jwt.sign({ userId }, secret, {
    expiresIn: expiresIn,
  });
};

export default generateToken;
