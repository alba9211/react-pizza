import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { getPrice } from "../../utils/getPrice";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

interface CartSliceState {
  price: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  price: getPrice(),
  items: getCartFromLS(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem: (state, action) => {
    //   state.items.push(action.payload);
    //   state.price = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.price = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        }
      }
      state.price = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.price = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.price = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
