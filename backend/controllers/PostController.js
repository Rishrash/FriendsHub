import Post from "../models/Post.js";
import UploadFileController from "./UploadFileController.js";

class PostController {
  static createPost = async (req, res) => {
    try {
      const { visibility, textDescription, user, username } = req.body;
      const post = await new Post();
      post.visibility = visibility;
      post.textDescription = textDescription;
      post.user = user;
      // save post to db
      await post.save();

      const path = `friendsHub/${username}/postPictures`;
      let files = Object.values(req.files).flat();
      let url = "";
      for (const file of files) {
        file.name = post._id;
        url = await UploadFileController.uploadToCloud(file, path);
        post.images.push(url);
      }

      await post.save();
      res.json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getPosts = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("user", "firstName lastName username profilePicture")
        .sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default PostController;
