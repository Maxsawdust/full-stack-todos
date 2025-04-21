import express from "express";
import {
  createUser,
  getUsers,
  loginUser,
} from "../controllers/users.controller";
import signupMiddleware from "../middleware/signupMiddleware";
import JWTMiddleware from "../middleware/JWTMiddleware";

// defining router from express
const router = express.Router();

// GET route to get all users in DB
router.get("/", getUsers);

// POST route to create a user, uses middleware to check if user exists already
router.post("/signup", signupMiddleware, createUser);

// POST route to login a user because it's creating a token
router.post("/login", loginUser);

export default router;
