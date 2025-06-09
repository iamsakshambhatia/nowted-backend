import express from "express";
import { getAllFolders } from "../controller/folderController";

const router = express.Router();

// router.post("/folders", createFolder);
router.get("/folders", getAllFolders);
// router.get("/folders/:id", getFolderById);
// router.patch("/folders/:id", updateFolder);
// router.delete("/folders/:id", deleteFolder);

export default router;
