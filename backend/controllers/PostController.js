import Post from "../models/Post.js";

class PostController {
  static createPost = async (req, res) => {
    try {
      const post = await new Post(req.body).save();
      res.json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getPosts = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("user", "firstName lastName username gender")
        .sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default PostController;
