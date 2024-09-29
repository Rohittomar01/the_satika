import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slices/Products";
import filterSlice from "./Slices/filter";
import addtocartSlice from "./Slices/addToCart";
export const store = configureStore({
  reducer: {
    products: productSlice,
    filters: filterSlice,
    addtocart: addtocartSlice,
  },
});
