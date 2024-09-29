import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

const addtoCartSlice = createSlice({
  name: "addtocart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const filterdItem = state.products.filter(
        (items) => items.product_id === action.payload.product_id
      );
      if (filterdItem.length > 0) {
        state.products.quantity += 1;
      } else {
        state.products.push(action.payload);
        state.totalItems += 1;
      }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (items) => items.product_id !== action.payload
      );
      state.totalItems -= 1;
    },
    incrementItems: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.product_id === action.payload) {
          state.totalItems += 1;
          return { ...item, quantity: item.quantity + 1 };
        }
      });
    },
    decrementItems: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.product_id === action.payload) {
          if (item.quantity === 1) {
            return { ...item, quantity: 1 };
          } else {
            state.totalItems -= 1;
            return { ...item, quantity: item.quantity - 1 };
          }
        }
      });
    },
  },
});

export const { addToCart, removeItem, incrementItems, decrementItems } =
  addtoCartSlice.actions;
export default addtoCartSlice.reducer;
