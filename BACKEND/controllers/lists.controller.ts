import { Request, Response } from "express";
import "dotenv/config";
import { List } from "../models/List.model";
import { User } from "../models/User.model";
import { getUserByiD } from "./users.controller";
import TodoType from "../types/TodoType";
import { Todo } from "../models/Todo.model";

export const getLists = async (req: Request, res: Response) => {
  try {
    // check if there's a req.user
    // if there's no req.user, then the user isn't logged in and isn't allowed this resource
    if (!req.user) {
      res.status(403).json({ message: "Unauthorized to access this resource" });
      return;
    }

    console.log(req.user);

    // if there is a user, then the lists can be accessed like so:
    // this is a function that uses findById to get a user
    // relies on JWT auth
    const user = await getUserByiD(req);

    const lists = user.lists;

    // send the lists
    res.json(lists);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const addList = async (req: Request, res: Response) => {
  try {
    // Find the user in the database
    const user = await getUserByiD(req);

    // create a new list from body
    const newlist = new List({ ...req.body });

    // Add the new list to the user's lists array
    user.lists.push(newlist);

    // Save the updated user
    await user.save();

    // Return the updated lists array
    res.status(201).json(user.lists);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;
    if (!listId) {
      res.status(404).json({ message: "list not found" });
      return;
    }

    const user = await getUserByiD(req);

    // Use pull to remove the list from the array
    user.lists.pull({ _id: listId });

    await user.save();

    res.json({ message: "list deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    // get user from external function
    const user = await getUserByiD(req);
    // get list from params
    const listId = req.params.id;
    if (!listId) {
      res.status(404).json({ message: "list not found" });
      return;
    }

    // Find the specific list using mongoose's id() method
    const list = user.lists.id(listId);
    if (!list) {
      res.status(404).json({ message: "list not found" });
      return;
    }

    // creating a new Todo model
    const newTodo = new Todo({ ...req.body });

    // pushing the todo to the user's lists.content array
    list.content.push(newTodo);

    // saving the changes to the user
    await user.save();

    res.status(201).json(list);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
