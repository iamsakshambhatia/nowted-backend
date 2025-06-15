import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  getRecentNotes,
  restoreNote,
  updateNote,
} from "../controller/noteController";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getAllNotes);
router.get("/recent", authMiddleware, getRecentNotes);
router.get("/:id", authMiddleware, getNoteById);
router.patch("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
router.patch("/:id/restore", authMiddleware, restoreNote);

export default router;
