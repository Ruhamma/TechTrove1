import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

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

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ProductDeleteRequest" });
      const { data } = await axios.delete(
        `${server}/product/adminDeleteProduct/${id}`,
        { withCredentials: true }
      );
      dispatch({ type: "ProductDeleteSuccess", payload: data.message });
      toast.success(data.message);
    } catch (error) {
      dispatch({
        type: "ProductDeleteFail",
        payload: error.response.data.message,
      });
      toast.error("Couldn't delete the product try again");
    }
  };
};
export const editProductAdmin=(id,productName,description,price,discountPrice,images)=>{
  return async (dispatch)=>{
    try {
      dispatch({type:"ProductEditRequest"});
      const { data } = await axios.put(
        `${server}/product/adminEditProduct`,
        { id, productName, description, price, discountPrice, images },
        { withCredentials: true }
      );
      dispatch({type:"ProductEditSuccess",payload:data.message});
      toast.success(data.message);
    } catch (error) {
      dispatch({type:"ProductEditFail",payload:error.response.data.message});
      toast.error("Couldn't edit the product try again");
    }
  }
}