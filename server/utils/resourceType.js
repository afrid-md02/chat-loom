const findResourceType = (extension) => {
  let resourceType;
  if (["jpg", "jpeg", "png"].includes(extension)) {
    resourceType = "image";
  } else if (extension === "svg") {
    resourceType = "raw";
  } else if (["webm, mp4, mov"].includes(extension)) {
    resourceType = "video";
  }
  return resourceType;
};

export default findResourceType;
