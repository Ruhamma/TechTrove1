import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  error: false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadProductRequest", (state) => {
      state.success = false;
      state.loading = true;
    })
    .addCase("LoadProductSuccess", (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase("LoadProductFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("ProductCreateRequest", (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("ProductCreateSuccess", (state, action) => {
      state.loading = false;
      state.success = true;
      state.products = action.payload;
    })
    .addCase("ProductCreateFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("ProductDeleteRequest", (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("ProductDeleteSuccess", (state, action) => {
      state.loading = false;
      state.success = true;
      state.products = action.payload;
    })
    .addCase("ProductDeleteFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
});
