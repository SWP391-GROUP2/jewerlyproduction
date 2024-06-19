import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    currentProduct: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    fetchProductStart: (state) => {
      state.isFetching = true;
    },
    fetchProductSuccess: (state, action) => {
      state.isFetching = false;
      state.currentProduct = action.payload;
      state.error = false;
    },
    fetchProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { fetchProductStart, fetchProductSuccess, fetchProductFailed } =
  productSlice.actions;

export default productSlice.reducer;
