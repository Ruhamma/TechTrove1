import axios from "axios";
import { server } from "../../server";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadProductRequest" });
    const { data } = await axios.get(`${server}/product/getProducts`);
    dispatch({ type: "LoadProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "LoadProductFail",
      payload: error.response.data.message,
    });
  }
};

export const addProduct = (productData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "ProductCreateRequest",
      });
      const response = await axios.post(
        `${server}/product/adminAddProduct`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: "ProductCreateSuccess",
        payload: response.product,
      });
    } catch (error) {
      dispatch({
        type: "ProductCreateFail",
        payload: error.response.data.message,
      });
    }
  };
};
