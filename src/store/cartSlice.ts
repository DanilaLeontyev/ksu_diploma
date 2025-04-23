import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";

export interface CartState {
  cart: Product[];
  cartId: string;
  productUIDs: string[];
}

const initialState: CartState = {
  cart: [],
  cartId: "",
  productUIDs: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    checkedForPaymentsIds: (state, action: PayloadAction<string>) => {
      if (state.productUIDs.includes(action.payload)) {
        state.productUIDs = state.productUIDs.filter(
          (v) => v !== action.payload
        );
      } else {
        state.productUIDs.push(action.payload);
      }
    },
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
    setCartId: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },
  },
});

export const { deleteFromCart, addToCart, setCartId, checkedForPaymentsIds } =
  cartSlice.actions;

export default cartSlice.reducer;
