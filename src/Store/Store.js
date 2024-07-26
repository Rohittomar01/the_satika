import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./Slices/Products";

export const store = configureStore({
  reducer: {
    products: productSlice,
  },
});
