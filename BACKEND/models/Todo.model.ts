import mongoose from "mongoose";

export const todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
