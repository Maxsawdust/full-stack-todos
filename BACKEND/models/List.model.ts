import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

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
