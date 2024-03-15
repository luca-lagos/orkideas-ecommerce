import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cart/cartSlice";
import { counterSlice } from "../features/shop/counterSlice";
import { authSlice } from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { shopApi } from "./services/shopService";
import { cartApi } from "./services/cartService";
import { authApi } from "./services/authService";
import { profileApi } from "./services/profileService";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      shopApi.middleware,
      cartApi.middleware,
      authApi.middleware,
      profileApi.middleware
    ),
});

setupListeners(store.dispatch);
