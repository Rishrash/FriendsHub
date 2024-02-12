import fs from "fs";

const uploadImg = async function (req, res, next) {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files has been selected" });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (isImage(file)) {
        removeFile(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported file format." });
      }
      if (file.size > 1024 * 1024 * 4) {
        removeFile(file.tempFilePath);
        return res
          .status(400)
          .json({ message: "Please upload a Image below 4MB" });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function isImage(file) {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  return !allowedImageTypes.includes(file.mimetype);
}

const removeFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
};

export default uploadImg;
