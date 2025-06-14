import { pool } from "../db/connection";

const TEMPORARY_ID = "f4ab01de-1523-473b-8399-d5551f3bc393";

export const getAllFoldersService = async () => {
  const result = await pool.query(
    `SELECT id, name, created_at, updated_at, archived_at FROM folders WHERE user_id = $1 AND archived_at IS NULL`,
    [TEMPORARY_ID]
  );
  return result.rows;
};

export const getFolderByIdService = async (id: string) => {
  const result = await pool.query(
    `SELECT id, name, created_at, updated_at, archived_at FROM folders WHERE user_id = $1 AND id = $2 AND archived_at IS NULl`,
    [TEMPORARY_ID, id]
  );
  return result.rows[0];
};

export const createFolderService = async (name: string) => {
  const result = await pool.query(
    `INSERT INTO folders(name, user_id) VALUES($1, $2) RETURNING id, name, created_at, updated_at, archived_at`,
    [name, TEMPORARY_ID]
  );
  return result.rows[0];
};

export const updateFolderService = async (name: string, id: string) => {
  const result = await pool.query(
    `UPDATE folders SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING id, name, created_at, updated_at, archived_at`,
    [name, id, TEMPORARY_ID]
  );
  return result.rows[0];
};

export const deleteFolderService = async (id: string) => {
  await pool.query("Begin");
  const result = await pool.query(
    "UPDATE folders SET archived_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2 RETURNING  id",
    [id, TEMPORARY_ID]
  );
  const result2 = await pool.query(
    "UPDATE notes SET archived_at = CURRENT_TIMESTAMP WHERE folder_id = $1 AND user_id = $2 RETURNING  id",
    [id, TEMPORARY_ID]
  );
  await pool.query("Commit");
  return result.rows[0];
};

export const restoreFolderService = async (id: string) => {
  const result = await pool.query(
    "UPDATE folders SET archived_at = null WHERE id = $1 AND user_id = $2 RETURNING  id, name, created_at",
    [id, TEMPORARY_ID]
  );
  return result.rows[0];
};
