import express from "express";
import PostController from "../controllers/PostController.js";

const router = express.Router();

router.post("/createPost", PostController.createPost);
router.get("/getPosts", PostController.getPosts);
export default router;
