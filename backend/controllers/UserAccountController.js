import UserAccount from "../models/UserAccount.js";
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
        yearOfBirth
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
}

export default UserAccountController;
