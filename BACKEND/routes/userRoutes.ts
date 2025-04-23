import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
} from "../controllers/users.controller";
import signupMiddleware from "../middleware/signupMiddleware";
import gmailMiddleware from "../middleware/gmailMiddleware";
// defining router from express
const router = express.Router();

// GET route to get all users
router.get("/", getUsers);

// POST route to create a user, uses middleware to check if user exists already
router.post("/signup", signupMiddleware, gmailMiddleware, createUser);

// POST route to login a user because it's creating a token
router.post("/login", loginUser);

// POST route to logout user because it's updating cookies
router.post("/logout", logoutUser);

export default router;
