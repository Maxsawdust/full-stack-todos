import mongoose from "mongoose";
import { Request, Response } from "express";
import { User } from "../models/User.model";
import { error } from "console";

export const createUser = async (req: Request, res: Response) => {
  // create a user with the req.body
  const newUser = new User({ ...req.body });
  try {
    // save the user to the DB
    await newUser.save();

    // status 201 for successfully creating
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // getting array of users from DB
    const users = await User.find();
    res.send(users);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
