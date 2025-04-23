import express from "express";
import {
  addList,
  addTodo,
  deleteList,
  getLists,
} from "../controllers/lists.controller";
import JWTMiddleware from "../middleware/JWTMiddleware";

// defining router from express
const router = express.Router();

// GET route to get all lists for a specific user
router.get("/", JWTMiddleware, getLists);

// PATH route to add a list
router.patch("/", JWTMiddleware, addList);

// DELETE route to delete a list
router.delete("/:id", JWTMiddleware, deleteList);

// PATCH route to add a todo item
router.patch("/:id", JWTMiddleware, addTodo);

export default router;
