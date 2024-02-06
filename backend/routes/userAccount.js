import express from "express";
import UserAccountController from "../controllers/UserAccountController.js";

const router = express.Router();

router.post("/register", UserAccountController.register);
router.post("/searchUser", UserAccountController.searchUser);
router.get("/getUserProfile/:username", UserAccountController.getUserProfile);
router.put(
  "/updateUserProfilePicture",
  UserAccountController.updateUserProfilePicture
);
router.post("/updateUserDetails", UserAccountController.updateUserDetails);

export default router;
