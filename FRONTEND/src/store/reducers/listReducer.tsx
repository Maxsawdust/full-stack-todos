import { createSlice } from "@reduxjs/toolkit";
import ListType from "../../interfaces/ListType";

interface ListReducerType {
  lists: ListType[];
  listBeingAdded: boolean;
}

const initialState: ListReducerType = {
  lists: [],
  listBeingAdded: false,
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
  },
});

export const { setListBeingAdded, setLists } = listSlice.actions;
export default listSlice.reducer;
