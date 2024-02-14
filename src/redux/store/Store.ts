import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/ProductsSlice";
import cartSlice from "../features/CartSlice";

export const Store = configureStore({
  reducer: {
    productsSlice,
    cartSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
