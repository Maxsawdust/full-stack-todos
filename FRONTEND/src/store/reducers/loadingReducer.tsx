import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingType {
  isLoading: boolean;
}

const initialState: LoadingType = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,

  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
