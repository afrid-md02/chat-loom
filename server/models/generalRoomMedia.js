import mongoose from "mongoose";

const Schema = mongoose.Schema;
const generalRoomMediaSchema = new Schema({
  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
});

const GeneralRoomMedia = mongoose.model(
  "GeneralRoomMedia",
  generalRoomMediaSchema
);
export default GeneralRoomMedia;
