import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../features/shop/counterSlice";
import { cartReducer } from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});
