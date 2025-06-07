import { Pool } from "pg";

const poolConfig = {
  host: process.env.DB_HOST ?? "",
  user: process.env.DB_USER ?? "",
  port: Number(process.env.DB_PORT) ?? "",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
};

export const pool = new Pool(poolConfig);

async function dbConnection() {
  try {
    const client = await pool.connect();
    if (client) console.log("db connected successfully");
  } catch (error) {
    console.error("error in connecting to db");
  }
}

(() => {
  dbConnection();
})();
