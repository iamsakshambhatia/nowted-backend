import { userSchema, validate } from "./userValidation";

export const validateCreateUser = validate(userSchema);

export const validateUpdateUser = validate(userSchema.omit({ password: true }));
