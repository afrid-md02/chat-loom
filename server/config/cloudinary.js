import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { friendId: receiverId } = req.params;

    let folder;
    if (req.url === `/send/${receiverId}`) {
      folder = process.env.CLOUDINARY_CHATFOLDER;
    } else if (req.url === "/send-message") {
      folder = process.env.CLOUDINARY_GENERALROOMFOLDER;
    } else if (req.url === "/update-profilePicture") {
      folder = process.env.CLOUDINARY_PROFILEFOLDER;
    }

    return {
      folder: folder,
      allowedFormats: ["jpg", "png", "jpeg", "svg", "mp4", "webm", "mov"],
      resource_type: "auto",
      maxFileSize: 10000000,
      public_id: file.originalname,
    };
  },
});

export default storage;
