import cloudinary from "cloudinary";

import extractPublicId from "./extractPublicId.js";

const destroyProfilePic = async (profilePictureUrl) => {
  try {
    const { publicId, extension } = extractPublicId(profilePictureUrl);

    let resourceType;
    if (["jpg", "jpeg", "png"].includes(extension)) {
      resourceType = "image";
    } else if (extension === "svg") {
      resourceType = "raw";
    } else {
      throw new Error("Unsupported media type");
    }

    const result = await cloudinary.v2.api.delete_resources([publicId], {
      type: "upload",
      resource_type: resourceType,
    });

    if (Object.values(result.deleted).includes("not_found")) {
      const error = new Error("Failed to delete previous profile picture");
      error.statusCode = 400;
      throw error;
    }

    return result;
  } catch (err) {
    return { err };
  }
};

export default destroyProfilePic;
