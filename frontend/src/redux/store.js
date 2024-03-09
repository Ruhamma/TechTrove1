import { ConfigureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";

const Store = ConfigureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
