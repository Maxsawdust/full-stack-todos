import mongoose from "mongoose";
import { todoSchema } from "./Todo.model";

export const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [todoSchema],
    default: [],
  },
});

export const List = mongoose.model("List", listSchema);
