import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mediaSchema = new Schema({
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

const Media = mongoose.model("Media", mediaSchema);
export default Media;
