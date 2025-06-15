import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, logoutUser, restoreUser, updateUser } from "../controller/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/logout", logoutUser)
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id/restore", restoreUser)

export default router;
