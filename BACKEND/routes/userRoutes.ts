import express from "express";
import { createUser, getUsers } from "../controllers/users.controller";
import signupMiddleware from "../middleware/signupMiddleware";

// defining router from express
const router = express.Router();

// GET route to get all users in DB
router.get("/", getUsers);

// POST route to create a user, uses middleware to check if user exists already
router.post("/signup", signupMiddleware, createUser);

export default router;
