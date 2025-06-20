import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice.ts";
import cart from "./slices/cartSlice.ts";
import pizza from "./slices/pizzaSlice.ts";
import fullPizza from "./slices/fullPizzaSlice.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filter, cart, pizza, fullPizza },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Экспортируем типизированную версию useDispatch
