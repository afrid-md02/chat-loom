import jwt from "jsonwebtoken";

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return false;
    }
    return decoded;
  });
};

export default verifyToken;
