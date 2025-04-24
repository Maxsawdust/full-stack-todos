import { createSlice } from "@reduxjs/toolkit";
import ListType from "../../interfaces/ListType";
import TodoType from "../../interfaces/TodoType";

interface ListReducerType {
  lists: ListType[];
  listBeingAdded: boolean;
  listBeingEdited: string | null;
  todos: TodoType[];
  todoBeingAdded: boolean;
  todoBeingEdited: string | null;
}

const initialState: ListReducerType = {
  lists: [],
  listBeingAdded: false,
  listBeingEdited: null,
  todos: [],
  todoBeingAdded: false,
  todoBeingEdited: null,
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

    setListBeingEdited: (state, action) => {
      // this will be an _id of a list
      state.listBeingEdited = action.payload;
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

    setTodoBeingEdited: (state, action) => {
      // in this instance, the payload will be an _id for a todo task
      state.todoBeingEdited = action.payload;
    },

    updateTodo: (state, action) => {
      const lists = state.lists;
      const listId = state.listBeingEdited;
      const todoId = state.todoBeingEdited;

      // find the index in lists array of the list being edited
      const currentListIndex = lists.findIndex((list) => list._id === listId);

      // find the index of the todo task in the list being edited
      const currentTodoIndex = lists[currentListIndex].content.findIndex(
        (t) => t._id === todoId
      );

      const list = lists[currentListIndex];
      // update the "message" in the list being edited
      list.content[currentTodoIndex].message = action.payload;
    },
  },
});

export const {
  setListBeingAdded,
  setLists,
  setListBeingEdited,
  setTodoBeingAdded,
  setTodos,
  setTodoBeingEdited,
  updateTodo,
} = listSlice.actions;
export default listSlice.reducer;
