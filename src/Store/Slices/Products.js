import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  products: [],
  wishListProducts: [],
  addToCartProducts: [],
  loading: false,
  error: null,
  snackbarMessage: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Set products
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setWishListProduct: (state, action) => {
      state.wishListProducts.push(action.payload);
    },
    removeWishListProduct: (state, action) => {
      state.wishListProducts = state.wishListProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Add a product
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    // Remove a product
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    // Update a product
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    // Add to cart
    addToCart: (state, action) => {
      const { product_id } = action.payload;
      const existingItem = state.addToCartProducts.find(
        (item) => item.product_id === product_id
      );
      if (existingItem) {
        state.snackbarMessage =
          "Item already exists in the cart, quantity updated!";
      } else {
        if (action.payload && Object.keys(action.payload).length > 0) {
          state.addToCartProducts.push({
            ...action.payload,
          });
          state.snackbarMessage = "Item added to cart!";
        }
        else{
          state.snackbarMessage = "Item added to cart!";
        }
      }
    },

    // Remove from cart
    removeFromCart: (state, action) => {
      const  product_id  = action.payload;
      state.addToCartProducts = state.addToCartProducts.filter(
        (item) => item.product_id !== product_id
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { title, quantity } = action.payload;
      const item = state.addToCartProducts.find((item) => item.title === title);
      if (item) {
        item.quantity = quantity;
      }
    },
    resetSnackbarMessage: (state) => {
      state.snackbarMessage = null;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  addProduct,
  removeProduct,
  updateProduct,
  setWishListProduct,
  removeWishListProduct,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  resetSnackbarMessage, // Export the resetSnackbarMessage action
} = productSlice.actions;

export default productSlice.reducer;

// Component to handle Snackbar
export const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const snackbarMessage = useSelector(
    (state) => state.products.snackbarMessage
  );

  React.useEffect(() => {
    if (snackbarMessage) {
      setTimeout(() => {
        dispatch(resetSnackbarMessage());
      }, 3000); // Clear the message after 3 seconds
    }
  }, [snackbarMessage, dispatch]);

  return (
    <Snackbar
      open={!!snackbarMessage}
      message={snackbarMessage}
      autoHideDuration={3000}
      onClose={() => dispatch(resetSnackbarMessage())}
    />
  );
};
