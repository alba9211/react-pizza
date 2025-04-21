import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  pageCount: 1,
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
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setPageCount } = filter.actions;

export default filter.reducer;
