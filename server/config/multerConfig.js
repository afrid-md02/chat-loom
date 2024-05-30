async function multerConfig(req, file, cb) {
  const allowedFormats = ["jpg", "jpeg", "png", "mp4", "webm", "mov", "svg"];
  const ext = file.originalname.split(".").pop().toLowerCase();
  if (!allowedFormats.includes(ext)) {
    return cb(
      new Error(
        "Only JPG, JPEG, PNG, MP4, WEBM, MOV, and SVG files are allowed"
      )
    );
  }
  cb(null, true);
}

export default multerConfig;
