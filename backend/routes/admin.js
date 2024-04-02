import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();
router.get("/api/admin/getReportedPosts", AdminController.getReportedPosts);
router.put(
  "/api/admin/deleteReportsFromPost",
  AdminController.deleteReportsFromPost
);
router.put("/api/admin/deletePostById", AdminController.deletePostById);
router.put("/api/admin/blockPostById", AdminController.blockPostById);

router.get("/api/admin/getReportedUsers", AdminController.getReportedUsers);
router.put("/api/admin/blockUserById", AdminController.blockUserById);
router.put(
  "/api/admin/deleteReportsFromUserAccount",
  AdminController.deleteReportsFromUserAccount
);

export default router;
