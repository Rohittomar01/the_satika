import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = state.wishlist.filter(
        (item) => item.product_id === action.payload.product_id
      );
      if (item.length > 0) {
        state.wishlist = state.wishlist.filter(
          (item) => item.product_id !== action.payload
        );
      } else {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.product_id !== action.payload
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
