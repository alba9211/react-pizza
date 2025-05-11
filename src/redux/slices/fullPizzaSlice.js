import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizza: null,
};

export const fullPizza = createSlice({
  name: "fullPizza",
  initialState,
  reducers: {
    setPizza: (state, action) => {
      state.pizza = action.payload;
    },
  },
});

export const { setPizza } = fullPizza.actions;

export default fullPizza.reducer;
