import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import todoRouter from "./routers/todoRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
connectDB();

app.use("/api/todos", todoRouter);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
