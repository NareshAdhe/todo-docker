import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updatedTodo,
} from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/get", getTodos);

todoRouter.post("/add", addTodo);

todoRouter.put("/update/:id", updatedTodo);

todoRouter.delete("/delete/:id", deleteTodo);

export default todoRouter;
