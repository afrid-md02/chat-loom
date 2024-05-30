import mongoose from "mongoose";

const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    conversationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    media: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Media",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
