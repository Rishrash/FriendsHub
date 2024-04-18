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

  static getPost = async (req, res) => {
    console.log("Hello");
    try {
      const post = await Post.findById(req.params.postId)
        .populate("user", "firstName lastName username profilePicture")
        .populate(
          "comments.commentBy",
          "firstName lastName username profilePicture"
        );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Error fetching post" });
    }
  };

  static reportPost = async (req, res) => {
    const { reportComment, userId, postId } = req.body;

    if (!postId || !reportComment || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            reports: {
              reportComment: reportComment,
              reportBy: userId,
              reportAt: new Date(),
            },
          },
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Report added successfully", post });
    } catch (error) {
      console.error("Error reporting the post: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  static commentPost = async (req, res) => {
    const { postComment, userId, postId } = req.body;

    if (!postId || !postComment || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment: postComment,
              commentBy: userId,
              commentAt: new Date(),
            },
          },
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Comment added successfully", post });
    } catch (error) {
      console.error("Error commenting the post: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  static likePost = async (req, res) => {
    const { userId, postId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the user has already liked the post
      const hasLiked = post.likes.some(
        (like) => like.likeBy.toString() === userId
      );
      if (hasLiked) {
        return res
          .status(400)
          .json({ message: "User has already liked the post" });
      }

      const updatePost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            likes: {
              likeBy: userId,
              likeAt: new Date(),
            },
          },
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post Liked successfully", updatePost });
    } catch (error) {
      console.error("Error liking the post: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  static removeLikeFromPost = async (req, res) => {
    const { userId, postId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the user has already liked the post
      const hasLiked = post.likes.some(
        (like) => like.likeBy.toString() === userId
      );
      if (!hasLiked) {
        return res.status(400).json({ message: "User has not liked the post" });
      }

      // Remove the like from the post
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            likes: { likeBy: userId },
          },
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Like removed successfully", post: updatedPost });
    } catch (error) {
      console.error("Error removing like from the post: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
export default PostController;
