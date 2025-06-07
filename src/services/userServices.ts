import { UUID } from "crypto";
import { pool } from "../db/connection";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserByIdService = async (id: any) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const createUserService = async (
  username: string,
  email: string,
  password: string
) => {
  const result = await pool.query(
    "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return result.rows[0];
};

export const updateUserService = async (
  id: string,
  username: string,
  email: string
) => {
  const result = await pool.query(
    "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
    [username, email, id]
  );
  return result.rows[0];
};

export const deleteUserService = async (id: string) => {
  const result = pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
  return (await result).rows[0];
};
