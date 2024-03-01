import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cart/cartSlice";
import { counterSlice } from "../features/shop/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
  },
});
