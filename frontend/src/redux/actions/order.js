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

    } catch (error) {
      dispatch({
        type: "OrderCreateFail",
        payload: error.response.data.message,
      });
    }
  };
};
