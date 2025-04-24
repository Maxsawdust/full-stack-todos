import { createSlice } from "@reduxjs/toolkit";
import ListType from "../../interfaces/ListType";
import TodoType from "../../interfaces/TodoType";
import { useAppSelector } from "../hooks/hooks";

interface ListReducerType {
  lists: ListType[];
  listBeingAdded: boolean;
  listBeingEdited: string | null;
  todos: TodoType[];
  todoBeingAdded: boolean;
  todoBeingEdited: string | null;
  todoBeingCompleted: string | null;
}

const findTodo = (
  lists: ListType[],
  listId: string | null,
  todoId: string | null
) => {
  if (!listId) {
    throw new Error("missing listId");
  }

  if (!todoId) {
    throw new Error("missing todoId");
  }

  // find the index in lists array of the list being edited
  const currentListIndex = lists.findIndex((list) => list._id === listId);

  // find the index of the todo task in the list being edited
  const currentTodoIndex = lists[currentListIndex].content.findIndex(
    (t) => t._id === todoId
  );

  const list = lists[currentListIndex];
  const todo = list.content[currentTodoIndex];

  return { list, todo };
};

const initialState: ListReducerType = {
  lists: [],
  listBeingAdded: false,
  listBeingEdited: null,
  todos: [],
  todoBeingAdded: false,
  todoBeingEdited: null,
  todoBeingCompleted: null,
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

    setTodoBeingCompleted: (state, action) => {
      state.todoBeingCompleted = action.payload;
    },

    updateTodo: (state, action) => {
      const listId = state.listBeingEdited;
      const todoId = state.todoBeingEdited || state.todoBeingCompleted;

      try {
        // get todo from function
        const { todo } = findTodo(state.lists, listId, todoId);

        // update the todo to reflect the payload
        Object.assign(todo, action.payload);
      } catch (err: any) {
        console.error(err.message);
      }
    },

    deleteTodo: (state, action) => {
      // get the list that is being displayed
      const listId = state.listBeingEdited;
      // get the todoId from payload
      const todoId = action.payload;

      try {
        // get todo and list from function
        const { todo, list } = findTodo(state.lists, listId, todoId);
        // remove it from store
        list.content.splice(list.content.indexOf(todo), 1);
      } catch (err) {
        console.error(err);
      }
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
  setTodoBeingCompleted,
  updateTodo,
  deleteTodo,
} = listSlice.actions;
export default listSlice.reducer;
