import express from "express";
import uploadImg from "../services/uploadImg.js";
import UploadFileController from "../controllers/UploadFileController.js";
// const { uploadImages, listImages } = require("../controllers/upload");
// const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/uploadImages", uploadImg, UploadFileController.uploadFile);
// router.post("/uploadImages", authUser, uploadImg, uploadImages);
// router.post("/listImages", authUser, listImages);

export default router;
