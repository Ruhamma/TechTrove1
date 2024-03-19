import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  error: false,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("OrderCreateRequest", (state) => {
      state.success = false;
      state.loading = true;
    })
    .addCase("OrderCreateSuccess", (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.success = true;
    })
    .addCase("OrderCreateFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
});
