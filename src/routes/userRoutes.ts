import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/userController";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../middleware/validator";

const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
