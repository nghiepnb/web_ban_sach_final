import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import loginSlice from "./features/login/loginSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    login : loginSlice
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(cartMiddleware),
});
