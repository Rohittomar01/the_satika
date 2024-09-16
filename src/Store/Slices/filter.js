import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    colors: [],
    brands: [],
    crafts: [],
    fabrics: [],
    origins: [],
    priceRange: [0, 10000],
    dropdownValue: 0
  },
  reducers: {
    setFilters(state, action) {
      const { category, values } = action.payload;
      state[category] = values;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setDropdownValue(state, action) {
      state.dropdownValue = action.payload; 
    },
    resetFilters(state) {
      state.colors = [];
      state.brands = [];
      state.crafts = [];
      state.fabrics = [];
      state.origins = [];
      state.priceRange = [0, 10000];
      state.dropdownValue = "";
    }
  },
});

export const { setFilters, setPriceRange, setDropdownValue, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
