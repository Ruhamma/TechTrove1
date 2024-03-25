import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

export const addOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "OrderCreateRequest",
      });
      const response = await axios.post(
        `${server}/order/create-order`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: "OrderCreateSuccess",
        payload: response.product,
      });
      toast.success("Order created Successfully");
      return { success: true };
    } catch (error) {
      dispatch({
        type: "OrderCreateFail",
        payload: error.response.data.message || "Order failed",
      });
      return { error: error.response.data.message || "Order failed" };
    }
  };
};

export const getUserOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "LoadOrderRequest" });
    const { data } = await axios.get(`${server}/order/getUserOrder/${id}`);
    dispatch({ type: "LoadOrderSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "LoadProductFail",
      payload: error.response.data.message,
    });
  }
};
