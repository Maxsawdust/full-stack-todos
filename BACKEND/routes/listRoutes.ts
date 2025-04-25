import express from "express";
import {
  addList,
  addTodo,
  deleteList,
  deleteTodo,
  editTodo,
  getLists,
} from "../controllers/lists.controller";
import JWTMiddleware from "../middleware/JWTMiddleware";
import todoLengthMiddleware from "../middleware/todoLengthMiddleware";
import contentTypeMiddleware from "../middleware/contentTypeMiddleware";

// defining router from express
const router = express.Router();

// GET route to get all lists for a specific user
router.get("/", JWTMiddleware, getLists);

// PATH route to add a list
router.patch("/", JWTMiddleware, contentTypeMiddleware, addList);

// DELETE route to delete a list
router.delete("/:id", JWTMiddleware, deleteList);

// PATCH route to add a todo item
router.patch(
  "/addTodo/:id",
  JWTMiddleware,
  todoLengthMiddleware,
  contentTypeMiddleware,
  addTodo
);

// PATH route to edit a todo item
router.patch(
  "/editTodo/:id",
  JWTMiddleware,
  todoLengthMiddleware,
  contentTypeMiddleware,
  editTodo
);

// DELETE route to remove a todo
router.delete("/deleteTodo/:id", JWTMiddleware, deleteTodo);

export default router;
