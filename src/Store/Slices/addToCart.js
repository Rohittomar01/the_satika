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
      const index = state.products.findIndex(
        (items) => items.product_id === action.payload.product_id
      );
      if (index >= 0) {
        state.products[index].quantity += 1;
        state.totalItems += 1;
      } else {
        state.products.push(action.payload);
        state.totalItems += 1;
      }
    },
    removeCartItem: (state, action) => {
      state.products = state.products.filter(
        (items) => items.product_id !== action.payload
      );
      state.totalItems -= 1;
    },
    incrementItems: (state, action) => {
      const index = state.products.findIndex((item) => {
        return item.product_id === action.payload;
      });
      if (index >= 0) {
        state.totalItems += 1;
        state.products[index].quantity += 1;
      }
    },
    decrementItems: (state, action) => {
      const index = state.products.findIndex((item) => {
        return item.product_id === action.payload;
      });
      if (state.products[index].quantity === 1) {
        state.products[index].quantity = 1;
      } else if (index >= 0) {
        state.totalItems -= 1;
        state.products[index].quantity -= 1;
      }
    },

    getDetails: (state) => {
      let { totalPrice, totalItems } = state.products.reduce(
        (Item, newItem) => {
          const { quantity, price } = newItem;
          const Total = quantity * price;
          Item.totalPrice += Total;
          Item.totalItems += quantity;
          console.log("totoal price", Total);
          return Item;
        },
        {
          totalPrice: 0,
          totalItems: 0,
        }
      );
      state.totalItems = totalItems;
      state.totalPrice = parseInt(totalPrice);
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  incrementItems,
  decrementItems,
  getDetails,
} = addtoCartSlice.actions;
export default addtoCartSlice.reducer;
