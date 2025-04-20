import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      console.log("action setCategoryId", action);
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSortType } = filter.actions;

export default filter.reducer;
