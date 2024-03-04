import express from "express";
import uploadImg from "../services/uploadImg.js";
import UploadFileController from "../controllers/UploadFileController.js";

const router = express.Router();

router.post("/uploadImages", uploadImg, UploadFileController.uploadFile);
router.post("/listImages", UploadFileController.listImages);

export default router;
