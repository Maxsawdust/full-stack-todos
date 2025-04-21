import express from "express";
import { addList, getLists } from "../controllers/lists.controller";
import JWTMiddleware from "../middleware/JWTMiddleware";

// defining router from express
const router = express.Router();

// GET route to get all lists for a specific user
router.get("/", JWTMiddleware, getLists);

router.patch("/", JWTMiddleware, addList);

export default router;
