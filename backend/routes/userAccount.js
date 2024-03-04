import express from "express";
import UserAccountController from "../controllers/UserAccountController.js";
import authenticateUser from "../services/authenticateUser.js";
const router = express.Router();

router.post("/register", UserAccountController.register);
router.post("/searchUser", UserAccountController.searchUser);
router.get(
  "/getUserProfile/:username",
  // authenticateUser,
  UserAccountController.getUserProfile
);

router.put(
  "/updateUserProfilePicture",
  UserAccountController.updateUserProfilePicture
);

router.post("/updateUserDetails", UserAccountController.updateUserDetails);
router.post("/user/login", UserAccountController.loginUser);
router.post("/user/signup", UserAccountController.signupUser);

export default router;
