import { createSlice } from "@reduxjs/toolkit";
import ListType from "../../interfaces/ListType";
import TodoType from "../../interfaces/TodoType";

interface ListReducerType {
  lists: ListType[];
  listBeingAdded: boolean;
  todos: TodoType[];
  todoBeingAdded: boolean;
}

const initialState: ListReducerType = {
  lists: [],
  listBeingAdded: false,
  todos: [],
  todoBeingAdded: false,
};

const listSlice = createSlice({
  name: "lists",
  initialState: initialState,
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },

    setListBeingAdded: (state, action) => {
      state.listBeingAdded = action.payload;
    },

    setTodos: (state, action) => {
      // get index of list with matching _id
      const listIndex = state.lists.findIndex(
        (list) => list._id === action.payload._id
      );
      if (listIndex !== -1) {
        // replace the list at listIndex with the new list
        state.lists[listIndex] = action.payload;
      }
    },

    setTodoBeingAdded: (state, action) => {
      state.todoBeingAdded = action.payload;
    },
  },
});

export const { setListBeingAdded, setLists, setTodoBeingAdded, setTodos } =
  listSlice.actions;
export default listSlice.reducer;
