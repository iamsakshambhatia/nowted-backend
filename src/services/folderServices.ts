import { pool } from "../db/connection";

const TEMPORARY_ID = "f4ab01de-1523-473b-8399-d5551f3bc393";

export const getAllFoldersService = async () => {
  const result = await pool.query(`SELECT id, name, created_at, updated_at, archived_at FROM folders WHERE user_id = $1`, [
    TEMPORARY_ID,
  ]);
  return result.rows;
};
