import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loadingReducer";
import listReducer from "./reducers/listReducer";

const store = configureStore({
  reducer: {
    loadingReducer: loadingReducer,
    listReducer: listReducer,
  },
});

export default store;

/* as referenced here: https://react-redux.js.org/using-react-redux/usage-with-typescript */
// type for the state of the store
export type RootState = ReturnType<typeof store.getState>;
// type for the dispatch of the store
export type AppDispatch = typeof store.dispatch;
