import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();
router.put("/api/admin/reportPost", AdminController.reportPost);
router.get("/api/admin/getReportedPosts", AdminController.getReportedPosts);
router.put(
  "/api/admin/deleteReportsFromPost",
  AdminController.deleteReportsFromPost
);
router.put("/api/admin/deletePostById", AdminController.deletePostById);
router.put("/api/admin/blockPostById", AdminController.blockPostById);

export default router;
