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

router.patch("/", JWTMiddleware, addList);

router.delete("/:id", JWTMiddleware, deleteList);

router.post("/:id", JWTMiddleware, addTodo);

export default router;
