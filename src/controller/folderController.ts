import { Request, Response, NextFunction } from "express";
import {
  createFolderService,
  deleteFolderService,
  getAllFoldersService,
  getFolderByIdService,
  restoreFolderService,
  updateFolderService,
} from "../services/folderServices";
import { folderData } from "../interface/folder.type";
import z from "zod";

const folderSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, "name should be at least 3 characters long"),
});

export const handleFoldersResponse = (
  res: Response,
  status: number,
  message: string | any,
  folders?: folderData | folderData[] | null
) => {
  res.status(status).json({
    status,
    message,
    folders,
  });
};

export const createFolder = async (req: Request, res: Response) => {
  const { name } = req.body;
  const validate = folderSchema.safeParse(req.body);
  if (!validate.success) {
    return handleFoldersResponse(res, 400, validate.error);
  }
  try {
    const newFolder = await createFolderService(name);
    handleFoldersResponse(res, 201, "Folder created successfully", newFolder);
  } catch (error) {
    console.log("createFolder: ", error);
    handleFoldersResponse(res, 500, "Internal server error");
  }
};

export const getAllFolders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folders = await getAllFoldersService();
    handleFoldersResponse(res, 200, "folders fetched successfully", folders);
  } catch (error) {
    next(error);
  }
};

export const getFolderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folder = await getFolderByIdService(req.params.id);
    if (!folder) {
      return handleFoldersResponse(res, 400, "Folder not found", []);
    }
    handleFoldersResponse(res, 200, "folders fetched successfully", folder);
  } catch (error) {
    next(error);
  }
};

export const updateFolder = async (req: Request, res: Response) => {
  const { name } = req.body;
  const validate = folderSchema.safeParse(req.body);
  if (!validate.success) {
    return handleFoldersResponse(res, 400, validate.error);
  }
  try {
    const folder = await updateFolderService(name, req.params.id);
    if (!folder) return handleFoldersResponse(res, 400, "Folder not found", []);
    handleFoldersResponse(res, 200, "Folder updated successfully", folder);
  } catch (error) {
    console.log("updateFolder: ", error);
    handleFoldersResponse(res, 500, "Internal server error");
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folder = await deleteFolderService(req.params.id);
    if (!folder) return handleFoldersResponse(res, 404, "Folder not found", []);
    handleFoldersResponse(res, 200, "Folder deleted successfully", folder);
  } catch (error) {
    console.log("deleteFolder: ", error);
    handleFoldersResponse(res, 500, "Internal server error");
  }
};

export const restoreFolder = async (req: Request, res: Response) => {
  try {
    const folder = await restoreFolderService(req.params.id);
    if (!folder) return handleFoldersResponse(res, 404, "Folder not found", []);
    handleFoldersResponse(res, 200, "Folder restored successfully", folder);
  } catch (error) {
    console.log("restoreFolder: ", error);
    handleFoldersResponse(res, 500, "Internal server error");
  }
};    
