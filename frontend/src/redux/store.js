import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { productReducer } from "./reducers/product";
import {wishlistReducer} from "./reducers/wishlist";
import { cartReducer } from "./reducers/cart";
import { orderReducer } from "./reducers/order";
const Store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order:orderReducer
  },
});

export default Store;
