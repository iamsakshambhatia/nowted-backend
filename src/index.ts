import express from "express";
import "dotenv/config";
import { pool } from "./db/connection";
import userRoutes from "./routes/userRoutes";
import folderRoutes from "./routes/folderRoutes";

const app = express();
const PORT = process.env.PORT;


// middleware
app.use(express.json());

//user routes
app.use("/api/user", userRoutes);

//folder routes
app.use("/api", folderRoutes)

// test
// app.get("/", async (req, res) => {
//   const result = await pool.query("SELECT current_database()");
//   res.send(`database: ${result.rows[0].current_database}`);
//   res.send(result);
// });

app.listen(PORT, () => console.log("server started"));
