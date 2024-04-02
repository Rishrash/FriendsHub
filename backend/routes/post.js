import express from "express";
import PostController from "../controllers/PostController.js";

const router = express.Router();

router.post("/createPost", PostController.createPost);
router.get("/getPosts", PostController.getPosts);
router.get("/getPost/:postId", PostController.getPost);
router.put("/commentPost", PostController.commentPost);
router.put("/likePost", PostController.likePost);
router.put("/removeLikeFromPost", PostController.removeLikeFromPost);
router.put("/reportPost", PostController.reportPost);

export default router;
