import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";

export interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deleteFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index === -1) return;

      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      } else {
        state.cart.splice(index, 1);
      }
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cart[index].quantity += 1;
        return;
      }

      state.cart.push({ ...action.payload, quantity: 1 });
    },
  },
});

export const { deleteFromCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
