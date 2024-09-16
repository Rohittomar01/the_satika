import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slices/Products";
import filterSlice from "./Slices/filter";
export const store = configureStore({
  reducer: {
    products: productSlice,
    filters: filterSlice,
  },
});
