import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());

app.listen(PORT, () => console.log("server started"));
