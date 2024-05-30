import mongoose from "mongoose";

const Schema = mongoose.Schema;
const conversationSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
