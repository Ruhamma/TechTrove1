import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  success: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase("UpdateImageRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateImageSuccess", (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase("UpdateImageFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("AddAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("AddAddressSuccess", (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase("AddAddressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UpdateAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateAddressSuccess", (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase("UpdateAddressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("DeleteAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("DeleteAddressSuccess", (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase("DeleteAddressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UpdateInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateInfoSuccess", (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase("UpdateInfoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UpdatePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase("UpdatePasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
