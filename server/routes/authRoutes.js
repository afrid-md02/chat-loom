import express from "express";
import { body } from "express-validator";

import isAuth from "../middlewares/auth.js";
import validateLink from "../middlewares/validateLink.js";

import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("userName", "Username must be min:4 characters in length")
      .trim()
      .isLength({ min: 4 }),
    body("email", "Enter valid email").trim().isEmail(),
    body("gender", "Gender must not be empty").not().isEmpty(),
    body("password", "Password must be min:6 characters in length")
      .trim()
      .isLength({ min: 6 }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords must match");
        }
        return true;
      }),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email", "Enter valid email").trim().isEmail(),
    body("password", "Password must be min:6 characters in length")
      .trim()
      .isLength({ min: 6 }),
  ],
  login
);

router.post(
  "/forgot-password",
  body("email", "Enter valid email").trim().isEmail(),
  forgotPassword
);

router.post(
  "/reset-password/:userId",
  validateLink,
  [
    body("newPassword", "New Password must be min:6 characters")
      .trim()
      .isLength({ min: 6 }),
    body("confirmNewPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("New passwords must match");
        }
        return true;
      }),
  ],
  resetPassword
);

router.put(
  "/update-password",
  isAuth,
  [
    body("newPassword", "The new password must be min:6 characters in length.")
      .trim()
      .isLength({ min: 6 }),
    body("confirmNewPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("New passwords must match!");
        }
        return true;
      }),
  ],
  updatePassword
);

export default router;
