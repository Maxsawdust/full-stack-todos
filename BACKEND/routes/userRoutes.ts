import express from "express";
import { createUser, getUsers } from "../controllers/users.controller";

// defining router from express
const router = express.Router();

// GET route to get all users in DB
router.get("/", getUsers);

// POST route to create a user
router.post("/signup", createUser);

export default router;
