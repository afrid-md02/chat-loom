import mongoose from "mongoose";

const Schema = mongoose.Schema;
const notificationSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["friendRequest", "friendRequestAccepted"],
    },
    from: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
