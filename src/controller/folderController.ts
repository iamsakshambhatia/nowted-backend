import {Request, Response, NextFunction} from "express";
import { getAllFoldersService } from "../services/folderServices";

export const handleFoldersResponse = (
  res: Response,
  status: number,
  message: string,
  folders: any = null
) => {
  res.status(status).json({
    status,
    message,
    folders,
  });
};

export const getAllFolders = async (req: Request, res:Response, next:NextFunction) => {
    try {
        const folders = await getAllFoldersService();
        handleFoldersResponse(res, 200, "folders fetched successfully", folders);
    } catch (error) {
        next(error)
    }
}