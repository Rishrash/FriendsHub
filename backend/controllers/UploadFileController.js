import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

class UploadFileController {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  static uploadFile = async (req, res) => {
    try {
      const { path } = req.body;
      let files = Object.values(req.files).flat();
      let images = [];
      for (const file of files) {
        const url = await uploadToCloud(file, path);
        images.push(url);
        removeFile(file.tempFilePath);
      }
      res.json(images);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  // const listImages = async (req, res) => {
  //   const { path, sort, max } = req.body;

  //   cloudinary.v2.search
  //     .expression(`${path}`)
  //     .sort_by("created_at", `${sort}`)
  //     .max_results(max)
  //     .execute()
  //     .then((result) => {
  //       res.json(result);
  //     })
  //     .catch((err) => {
  //       console.log(err.error.message);
  //     });
  // };

  uploadToCloudinary = async (file, path) => {
    return new Promise((resolve) => {
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: path,
        },
        (err, res) => {
          if (err) {
            removeFile(file.tempFilePath);
            return res.status(400).json({ message: "Upload image failed." });
          }
          resolve({
            url: res.secure_url,
          });
        }
      );
    });
  };

  removeFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });
  };
}

export default UploadFileController;
