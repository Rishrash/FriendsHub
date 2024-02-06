import UserAccount from "../models/UserAccount.js";
import bcrypt from "bcrypt";
import express from "express";

class UserAccountController {
  // app = express();

  // constructor() {
  //   app.use(express.json());
  // }
  static register = async (req, res) => {
    try {
      const dummyUser = new UserAccount({
        firstName: "Jane",
        lastName: "Doe",
        username: "jane.doe",
        emailAddress: "jane@example.com",
        password: await bcrypt.hash("password456", 10), // Hash the password
        role: "user",
        userInformation: {
          nickName: "Janie",
          bio: "I am a software engineer.",
          jobRole: "Full Stack Developer",
          workplace: "Tech Innovators",
          education: "Master's Degree",
          college: "Tech University",
          school: "High Tech School",
          homeTown: "Techville",
          currentCity: "Innovation City",
          relationshipStatus: "In a relationship",
          mobileNumber: "9876543210",
          gender: "female",
          yearOfBirth: 1995,
          monthOfBirth: 8,
          dateOfBirth: 20,
          friends: [],
          friendRequests: [],
        },
      });

      // const user = await UserAccount.findOne({
      //   emailAddress: "jane@example.com",
      // });
      // Save the dummy user
      const savedUser = await dummyUser.save();

      // // Dummy User Information
      // const dummyUserInformation = new UserAccountInformation({
      //   nickName: "Janie",
      //   bio: "I am a software engineer.",
      //   jobRole: "Full Stack Developer",
      //   workplace: "Tech Innovators",
      //   education: "Master's Degree",
      //   college: "Tech University",
      //   school: "High Tech School",
      //   homeTown: "Techville",
      //   currentCity: "Innovation City",
      //   relationshipStatus: "In a Relationship",
      //   mobileNumber: "9876543210",
      //   gender: "female",
      //   yearOfBirth: 1995,
      //   monthOfBirth: 8,
      //   dateOfBirth: 20,
      //   friends: [],
      //   friendRequests: [],
      // });

      // Associate the user information with the user account and save
      // savedUser.userInformation = dummyUserInformation;
      // await savedUser.save();
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
      console.log("Called me");
      const userProfile = await UserAccount.findOne({ username });
      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ userProfile });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateUserProfilePicture = async (req, res) => {
    try {
      const { url } = req.body;

      await UserAccount.findByIdAndUpdate(req.user.id, {
        profilePicture: url,
      });
      res.json(url);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateUserDetails = async (req, res) => {
    try {
      const updatedUserData = req.body; // Assuming the updated data is in the request body

      const updatedUserInformation = await UserAccount.updateOne(
        // { username: req.session.loggedInUserName },
        { username: "jane.doe" },
        {
          $set: {
            nickName: updatedUserData.nickName,
            bio: updatedUserData.bio,
            jobRole: updatedUserData.jobRole,
            workplace: updatedUserData.workplace,
            education: updatedUserData.education,
            college: updatedUserData.college,
            school: updatedUserData.school,
            homeTown: updatedUserData.homeTown,
            currentCity: updatedUserData.currentCity,
            relationshipStatus: updatedUserData.relationshipStatus,
            mobileNumber: updatedUserData.mobileNumber,
            gender: updatedUserData.gender,
            yearOfBirth: updatedUserData.yearOfBirth,
            monthOfBirth: updatedUserData.monthOfBirth,
            dateOfBirth: updatedUserData.dateOfBirth,
          },
        }
      );

      // Check if the update was successful
      if (updatedUserInformation.nModified > 0) {
        console.log(
          "User Account Information Updated:",
          updatedUserInformation
        );
        res
          .status(200)
          .json({ message: "User account information updated successfully" });
      } else {
        console.log(
          "User Account Information not updated. User not found or data unchanged."
        );
        res.status(404).json({ error: "User not found or data unchanged" });
      }
    } catch (error) {
      console.error("Error updating user account information:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  };
}
export default UserAccountController;
