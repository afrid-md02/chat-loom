import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const signup = async (req, res, next) => {
  try {
    // const imageUrl = req.file?.path;
    const { userName, email, gender, password } = req.body;

    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    //check the user name and email in database
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Email already exist, signin");
      error.statusCode = 403;
      throw error;
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //set profile
    let profilePicture;
    if (gender === "male") {
      profilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName.replace(
        /\s/g,
        ""
      )}`;
    } else {
      profilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName.replace(
        /\s/g,
        ""
      )}`;
    }

    //create new user in database
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePicture,
    });

    //send email and response
    transporter.sendMail(
      {
        from: '"ChatLoom Admin" <admin001@chatloom.com>',
        to: newUser.email,
        subject: "Greetings",
        html: `<h4>Hi ${newUser.userName},</h4>
              <p>Welcome to the Chatloom.</p>`,
      },
      (error, response) => {
        if (error) {
          console.log(error.message);
        }
      }
    );
    await res
      .status(201)
      .json({ newUser, message: "Your new account has been created" });
  } catch (err) {
    if (
      err.message.includes("duplicate key error collection: chat-loom.users")
    ) {
      const error = new Error("Username already in use, choose different one");
      error.statusCode = 403;
      return next(error);
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    //find user in db
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      throw error;
    }

    //compare password
    const check = await bcryptjs.compare(password, user.password);
    if (!check) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user._id, process.env.JWT_LOGINSECRET, "12h");

    await res
      .status(200)
      .json({ user, token, message: "Logged in successfully" });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    //check the user in db
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      throw error;
    }

    //create one time link and valid for 15mins
    const token = generateToken(
      user._id,
      `ForgotPassword-Secret+${user.password}`,
      "15min"
    );
    const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;

    //send link to email
    const result = await transporter.sendMail({
      from: '"ChatLoom Admin" <admin001@chatloom.com>',
      to: user.email,
      subject: "Password reset",
      html: `<h4>Hi ${user.userName},</h4>
              <p>Click this <a href=${link}>link</a> to reset your password.</p>
              <p>Note: The link will expire in 15 minutes and one time use only.</p>`,
    });

    if (result.accepted.length === 0) {
      const error = new Error("Failed to send email, please try again");
      error.statusCode = 401;
      throw error;
    }

    await res
      .status(200)
      .json({ token, link, message: "Email sent successfully" });
  } catch (err) {
    if (err.message.includes("Invalid login")) {
      const error = new Error("Failed to send email, please try again");
      error.statusCode = 424;
      return next(error);
    }
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { userId } = req;
    const { newPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const user = await User.findById(userId);

    user.password = hashedPassword;
    await user.save();

    await res
      .status(201)
      .json({ user, message: "The password has been reset successfully" });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(req.userId);
    const check = await bcryptjs.compare(oldPassword, user.password);

    if (!check) {
      const error = new Error("Incorrect old password");
      error.statusCode = 401;
      throw error;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
