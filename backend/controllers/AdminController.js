import Post from "../models/Post.js";
import UserAccount from "../models/UserAccount.js";

class AdminController {
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

  static getReportedUsers = async (req, res) => {
    try {
      const usersWithReports = await UserAccount.find({
        $expr: {
          $gt: [{ $size: "$userInformation.reports" }, 0],
        },
      })
        .find({ isBlocked: false })
        .populate(
          "userInformation.reports.reportBy",
          "firstName lastName username profilePicture"
        );

      if (usersWithReports.length === 0) {
        return res.status(404).json({ message: "No reported posts found" });
      }

      res.status(200).json(usersWithReports);
    } catch (error) {
      console.error("Error fetching users with reports: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  static blockUserById = async (req, res) => {
    try {
      const { userId } = req.body;

      // Find the user by ID
      const user = await UserAccount.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user's isBlocked property to true
      user.isBlocked = true;

      // Save the updated user
      await user.save();

      return res.status(200).json({ message: "User blocked successfully" });
    } catch (error) {
      console.error("Error blocking post:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  static deleteReportsFromUserAccount = async (req, res) => {
    try {
      const { userId } = req.body;

      // Check if the user exists
      const user = await UserAccount.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Remove reports from the user account
      user.userInformation.reports = [];

      // Save the updated user account
      await user.save();

      return res.status(200).json({
        message: "Reports deleted from the user account successfully",
      });
    } catch (error) {
      console.error("Error deleting reports from user account:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
export default AdminController;
