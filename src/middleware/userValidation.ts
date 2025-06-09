import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(3, "username should be of at least 3 characters"),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(1, "Email cannot be empty")
    .email("Invalid email"),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(8, "password should be of at least 8 characters"),
});

export const validate = (
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>
) => {
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      let err = error;
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({
          path: e.path[0],
          message: e.message,
        }));
      }
      return res.status(400).json({
        status: 400,
        error: err,
      });
    }
  };
};
