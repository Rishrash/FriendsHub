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
        const url = await this.uploadToCloud(file, path);
        images.push(url);
        this.removeFile(file.tempFilePath);
      }
      res.json(images);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  static uploadToCloud = async (file, path) => {
    return new Promise((resolve) => {
      const filepath = !file.tempFilePath ? file : file.tempFilePath;
      cloudinary.v2.uploader.upload(
        filepath,
        {
          folder: path,
          public_id: file.name,
        },
        (err, res) => {
          if (err) {
            this.removeFile(filepath);
            return res.status(400).json({ message: "Upload image failed." });
          }
          resolve({
            url: res.secure_url,
          });
        }
      );
    });
  };

  static listImages = async (req, res) => {
    const { path, sort, max } = req.body;

    cloudinary.v2.search
      .expression(`${path}`)
      .sort_by("created_at", `${sort}`)
      .max_results(max)
      .execute()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err.error.message);
      });
  };

  static removeFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });
  };
}

export default UploadFileController;
