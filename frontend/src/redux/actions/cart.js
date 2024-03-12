import { toast } from "react-toastify";

export const addToCart = (data) => async (dispatch, getState) => {
  const item = getState().cart.cart.find((i) => i._id === data._id);
  if (item) {
   toast.error("Item already in cart");
  } else {
    dispatch({ type: "addToCart", payload: data });
   toast.success("Item added to cart");

  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
