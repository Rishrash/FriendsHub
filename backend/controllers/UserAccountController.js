import UserAccount from "../models/UserAccount.js";
import UploadFileController from "./UploadFileController.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserAccountController {
  // login a user
  static loginUser = async (req, res) => {
    const { emailAddress, password } = req.body;

    try {
      const user = await UserAccount.login(emailAddress, password);

      const userId = user._id;
      const username = user.username;
      // create a token
      const token = jwt.sign({ _id: userId }, process.env.SECRET, {
        expiresIn: "3d",
      });

      res.status(200).json({ userId, username, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // signup a user
  static signupUser = async (req, res) => {
    console.log("Signup Called");
    const { emailAddress, password, firstName, lastName, username, dob } =
      req.body;
    const profilePicture =
      "https://res.cloudinary.com/dygst600u/image/upload/v1710214518/friendsHub/nvjd69xjdliflwdv2h6t.png";
    try {
      const _dob = new Date(dob);

      const dateOfBirth = _dob.getDate() + 1;
      const monthOfBirth = _dob.getMonth() + 1;
      const yearOfBirth = _dob.getFullYear();
      const user = await UserAccount.signup(
        emailAddress,
        password,
        firstName,
        lastName,
        username,
        dateOfBirth,
        monthOfBirth,
        yearOfBirth,
        profilePicture
      );

      // create a token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: "3d",
      });

      res.status(200).json({ emailAddress, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static register = async (req, res) => {
    try {
      const userData = req.body;
      const dummyUser = new UserAccount({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        emailAddress: userData.emailAddress,
        password: await bcrypt.hash(userData.password, 10), // Hash the password
        role: userData.role,
        userInformation: {
          nickName: userData.userInformation.nickName,
          bio: userData.userInformation.bio,
          jobRole: userData.userInformation.jobRole,
          workplace: userData.userInformation.workplace,
          education: userData.userInformation.education,
          college: userData.userInformation.college,
          school: userData.userInformation.school,
          homeTown: userData.userInformation.homeTown,
          currentCity: userData.userInformation.currentCity,
          relationshipStatus: userData.userInformation.relationshipStatus,
          mobileNumber: userData.userInformation.mobileNumber,
          gender: userData.userInformation.gender,
          yearOfBirth: userData.userInformation.yearOfBirth,
          monthOfBirth: userData.userInformation.monthOfBirth,
          dateOfBirth: userData.userInformation.dateOfBirth,
          friends: [],
          friendRequests: [],
        },
      });
      const savedUser = await dummyUser.save();

      res.status(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static searchUser = async (req, res) => {
    try {
      const { emailAddress } = req.body;
      const user = await UserAccount.findOne({ emailAddress }).select(
        "-password"
      );
      if (!user) {
        return res.status(400).json({
          message: "User Account Not Found",
        });
      }
      return res.status(200).json({
        emailAddress: user.emailAddress,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static getUserProfile = async (req, res) => {
    try {
      const { username } = req.params;
      const userProfile = await UserAccount.findOne({ username });
      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ userProfileData: userProfile });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateUserProfilePicture = async (req, res) => {
    try {
      const { path, username } = req.body;
      let files = Object.values(req.files).flat();
      let response = await UploadFileController.uploadToCloud(files[0], path);

      await UserAccount.updateOne(
        { username: username },
        {
          $set: {
            profilePicture: response.url,
          },
        }
      );
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateUserDetails = async (req, res) => {
    try {
      const updatedUserData = req.body;
      console.log("updatedUserData" + updatedUserData.username);
      const updatedUserInformation = await UserAccount.updateOne(
        { username: updatedUserData.username },
        {
          $set: {
            "userInformation.nickName": updatedUserData.nickName,
            "userInformation.bio": updatedUserData.bio,
            "userInformation.jobRole": updatedUserData.jobRole,
            "userInformation.workplace": updatedUserData.workplace,
            "userInformation.education": updatedUserData.education,
            "userInformation.college": updatedUserData.college,
            "userInformation.school": updatedUserData.school,
            "userInformation.homeTown": updatedUserData.homeTown,
            "userInformation.currentCity": updatedUserData.currentCity,
            "userInformation.relationshipStatus":
              updatedUserData.relationshipStatus,
            "userInformation.mobileNumber": updatedUserData.mobileNumber,
            "userInformation.gender": updatedUserData.gender,
          },
        }
      );

      console.log("User Account Information Updated:", updatedUserInformation);
      res
        .status(200)
        .json({ message: "User account information updated successfully" });
    } catch (error) {
      console.error("Error updating user account information:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  };

  static sendFollowRequest = async (req, res) => {
    const { currentUsername, usernameToSendFollowRequest } = req.body;

    try {
      // Find the current user
      const currentUser = await UserAccount.findOne({
        username: currentUsername,
      });
      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      // Find the user to follow
      const userToFollow = await UserAccount.findOne({
        username: usernameToSendFollowRequest,
      });
      if (!userToFollow) {
        return res.status(404).json({
          error: `User with username ${usernameToSendFollowRequest} not found`,
        });
      }

      const user = await UserAccount.findOneAndUpdate(
        { username: currentUsername },
        {
          $push: {
            "userInformation.sentfollowRequests": usernameToSendFollowRequest,
          },
        },
        { new: true }
      );

      const userToSendFollowRequest = await UserAccount.findOneAndUpdate(
        { username: usernameToSendFollowRequest },
        {
          $push: { "userInformation.incomingfollowRequests": currentUsername },
        },
        { new: true }
      );

      if (!user || !userToSendFollowRequest) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return success response
      return res.status(200).json({ message: "Follow Request Sent" });
    } catch (error) {
      console.error("Error sending follow request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  static cancelFollowRequest = async (req, res) => {
    const { currentUsername, usernameToCancelFollowRequest } = req.body;

    try {
      // Find the current user
      const currentUser = await UserAccount.findOne({
        username: currentUsername,
      });
      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      // Find the otherUser
      const otherUser = await UserAccount.findOne({
        username: usernameToCancelFollowRequest,
      });
      if (!otherUser) {
        return res.status(404).json({
          error: `User with username ${usernameToCancelFollowRequest} not found`,
        });
      }

      const user = await UserAccount.findOneAndUpdate(
        { username: currentUsername },
        {
          $pull: {
            "userInformation.sentfollowRequests": usernameToCancelFollowRequest,
          },
        },
        { new: true }
      );

      const userToCancelFollowRequest = await UserAccount.findOneAndUpdate(
        { username: usernameToCancelFollowRequest },
        {
          $pull: { "userInformation.incomingfollowRequests": currentUsername },
        },
        { new: true }
      );
      if (!user || !userToCancelFollowRequest) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return success response
      return res.status(200).json({ message: "Follow Request Cancelled" });
    } catch (error) {
      console.error("Error Cancelling follow request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  static acceptFollowRequest = async (req, res) => {
    const { currentUsername, usernameToAcceptFollowRequest } = req.body;

    try {
      // Find the current user
      const currentUser = await UserAccount.findOne({
        username: currentUsername,
      });
      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      // Find the otherUser
      const otherUser = await UserAccount.findOne({
        username: usernameToAcceptFollowRequest,
      });
      if (!otherUser) {
        return res.status(404).json({
          error: `User with username ${usernameToAcceptFollowRequest} not found`,
        });
      }

      // Find the user by currentUsername and update the followers and followRequests arrays
      const user = await UserAccount.findOneAndUpdate(
        { username: currentUsername },
        {
          $push: { "userInformation.followers": usernameToAcceptFollowRequest },
          $pull: {
            "userInformation.incomingfollowRequests":
              usernameToAcceptFollowRequest,
          },
        },
        { new: true }
      );

      const userToFollow = await UserAccount.findOneAndUpdate(
        { username: usernameToAcceptFollowRequest },
        {
          $push: { "userInformation.following": currentUsername },
          $pull: { "userInformation.sentfollowRequests": currentUsername },
        },
        { new: true }
      );

      // Check if the user exists
      if (!user || !userToFollow) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return success response
      return res.status(200).json({ message: "Follow request accepted" });
    } catch (error) {
      console.error("Error accepting follow request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  static rejectFollowRequest = async (req, res) => {
    const { currentUsername, usernameToRejectFollowRequest } = req.body;

    try {
      // Find the current user
      const currentUser = await UserAccount.findOne({
        username: currentUsername,
      });
      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      // Find the otherUser
      const otherUser = await UserAccount.findOne({
        username: usernameToRejectFollowRequest,
      });
      if (!otherUser) {
        return res.status(404).json({
          error: `User with username ${usernameToRejectFollowRequest} not found`,
        });
      }

      // Find the user by currentUsername and remove the followerUsername from followRequests array
      const user = await UserAccount.findOneAndUpdate(
        { username: currentUsername },
        {
          $pull: {
            "userInformation.incomingfollowRequests":
              usernameToRejectFollowRequest,
          },
        },
        { new: true }
      );

      const userToRejectFollowRequest = await UserAccount.findOneAndUpdate(
        { username: usernameToRejectFollowRequest },
        {
          $pull: { "userInformation.sentfollowRequests": currentUsername },
        },
        { new: true }
      );

      // Check if the user exists
      if (!user || !userToRejectFollowRequest) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return success response
      return res.status(200).json({ message: "Follow request rejected" });
    } catch (error) {
      console.error("Error rejecting follow request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  static unfollowExistingFollower = async (req, res) => {
    const { currentUsername, usernameToUnfollow } = req.body;

    try {
      // Find the current user
      const currentUser = await UserAccount.findOne({
        username: currentUsername,
      });
      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      // Find the otherUser
      const userToUnfollow = await UserAccount.findOne({
        username: usernameToUnfollow,
      });
      if (!userToUnfollow) {
        return res.status(404).json({
          error: `User with username ${usernameToUnfollow} not found`,
        });
      }

      const user = await UserAccount.findOneAndUpdate(
        { username: currentUsername },
        {
          $pull: { "userInformation.followers": usernameToUnfollow },
        },
        { new: true }
      );

      const unfollowedUser = await UserAccount.findOneAndUpdate(
        { username: usernameToUnfollow },
        {
          $pull: { "userInformation.following": currentUsername },
        },
        { new: true }
      );

      // Check if the user exists
      if (!user && !unfollowedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "Successfully Unfollowed " + usernameToUnfollow });
    } catch (error) {
      console.error("Error while unfollowing user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  static getUserProfilesForIncommingFollowRequest = async (req, res) => {
    const { username } = req.params;

    try {
      const currentUser = await UserAccount.findOne({ username });

      if (!currentUser) {
        return res.status(404).json({ error: "Current user not found" });
      }

      const incomingfollowRequests =
        currentUser.userInformation.incomingfollowRequests;
      const users = await UserAccount.find({
        username: { $in: incomingfollowRequests },
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error getting user profiles:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default UserAccountController;
