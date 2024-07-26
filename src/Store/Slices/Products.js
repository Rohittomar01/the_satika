import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  wishListProducts: [],
  addToCartProducts: [], // This will track products added to cart
  loading: false,
  error: null,
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
      const { title, quantity } = action.payload;

      // Check if product is already in cart
      const existingItem = state.addToCartProducts.find(
        (item) => item.title === title
      );

      if (existingItem) {
        // Update quantity if the item already exists
        existingItem.quantity += quantity;
      } else {
        // Add new product to cart
        const product = state.products.find((item) => item.title === title);
        if (product) {
          state.addToCartProducts.push({
            ...product,
            quantity,
          });
        }
      }
    },
    // Remove from cart
    removeFromCart: (state, action) => {
      const title = action.payload;
      state.addToCartProducts = state.addToCartProducts.filter(
        (item) => item.title !== title
      );
    },
    // Update cart item quantity
    updateCartItemQuantity: (state, action) => {
      const { title, quantity } = action.payload;
      const item = state.addToCartProducts.find(
        (item) => item.title === title
      );

      if (item) {
        item.quantity = quantity;
      }
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
} = productSlice.actions;

export default productSlice.reducer;
