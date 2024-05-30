import mongoose from "mongoose";

const Schema = mongoose.Schema;
const generalRoomMessageSchema = new Schema(
  {
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
    },
    media: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "GeneralRoomMedia",
    },
  },
  { timestamps: true }
);

const GeneralRoomMessage = mongoose.model(
  "GeneralRoomMessage",
  generalRoomMessageSchema
);
export default GeneralRoomMessage;
