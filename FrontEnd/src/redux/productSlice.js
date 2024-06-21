import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    autoFill: { currentProduct: null, isFetching: false, error: false },
  },
  reducers: {
    fetchProductStart: (state) => {
      state.autoFill.isFetching = true;
    },
    fetchProductSuccess: (state, action) => {
      state.autoFill.isFetching = false;
      state.autoFill.currentProduct = action.payload;
      state.autoFill.error = false;
    },
    fetchProductFailed: (state) => {
      state.autoFill.isFetching = false;
      state.autoFill.error = true;
    },
  },
});

export const { fetchProductStart, fetchProductSuccess, fetchProductFailed } =
  productSlice.actions;

export default productSlice.reducer;
