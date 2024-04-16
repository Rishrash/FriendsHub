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
router.put("/sendFollowRequest", UserAccountController.sendFollowRequest);
router.put("/cancelFollowRequest", UserAccountController.cancelFollowRequest);
router.put("/acceptFollowRequest", UserAccountController.acceptFollowRequest);
router.put("/rejectFollowRequest", UserAccountController.rejectFollowRequest);
router.put(
  "/unfollowExistingFollower",
  UserAccountController.unfollowExistingFollower
);
router.post(
  "/getFollowersOrFollowingUserProfiles/:username",
  UserAccountController.getFollowersOrFollowingUserProfiles
);
router.get(
  "/getUserProfilesForIncommingFollowRequest/:username",
  UserAccountController.getUserProfilesForIncommingFollowRequest
);
router.put("/reportUser", UserAccountController.reportUser);

export default router;
