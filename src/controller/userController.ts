import { Response, Request, NextFunction } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../services/userServices";

const handleResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await createUserService(username, email, password);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.body;
  try {
    const user = await updateUserService(req.params.id, username, email);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 201, "User updated successfully", user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await deleteUserService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted successfully", user);
  } catch (error) {
    next(error);
  }
};
