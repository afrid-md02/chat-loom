import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      require: true,
      enum: ["male", "female"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    friends: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        default: [],
        ref: "User",
      },
    ],
    blocked: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        default: [],
        ref: "User",
      },
    ],
    sentRequests: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        default: [],
        ref: "User",
      },
    ],
    pendingRequests: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        default: [],
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
