import Post from "../models/Post.js";
import UserAccount from "../models/UserAccount.js";

class AdminController {
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

  static getReportedPosts = async (req, res) => {
    try {
      const postsWithReports = await Post.find({
        $expr: {
          $gt: [{ $size: "$reports" }, 0],
        },
      })
        .find({ isBlocked: false })
        .populate("user", "firstName lastName username profilePicture")
        .populate(
          "reports.reportBy",
          "firstName lastName username profilePicture"
        );

      if (postsWithReports.length === 0) {
        return res.status(404).json({ message: "No reported posts found" });
      }

      res.status(200).json(postsWithReports);
    } catch (error) {
      console.error("Error fetching posts with reports: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  static deleteReportsFromPost = async (req, res) => {
    try {
      const { postId } = req.body;

      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Remove reports from the post
      post.reports = [];

      // Save the updated post
      await post.save();

      return res
        .status(200)
        .json({ message: "Reports deleted from the post successfully" });
    } catch (error) {
      console.error("Error deleting reports from post:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  static deletePostById = async (req, res) => {
    try {
      const { postId } = req.body;

      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  static blockPostById = async (req, res) => {
    try {
      const { postId } = req.body;

      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Update the post's isBlocked property to true
      post.isBlocked = true;

      // Save the updated post
      await post.save();

      return res.status(200).json({ message: "Post blocked successfully" });
    } catch (error) {
      console.error("Error blocking post:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
export default AdminController;
