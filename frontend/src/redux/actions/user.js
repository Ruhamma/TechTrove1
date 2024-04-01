import axios from "axios";
import { server } from "../../server";
import { toast } from "sonner";
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true,
    });
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoadUserFail", payload: error.response.data.message });
  }
};

export const updateUserImage = (avatar) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateImageRequest" });
    const { data } = await axios.put(
      `${server}/user/update-avatar`,
      { avatar },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "UpdateImageSuccess", payload: data });
    toast.success("Image updated successfully");
  } catch (error) {
    dispatch({ type: "UpdateImageFail", payload: error.response.data.message });
    toast.error("Image update failed");
  }
};

export const addAddress =
  (country, city, address1, address2) => async (dispatch) => {
    try {
      dispatch({ type: "AddAddressRequest" });
      const { data } = await axios.put(
        `${server}/user/add-address`,
        { country, city, address1, address2 },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "AddAddressSuccess", payload: data.user });
      toast.success("Address added successfully");
    } catch (error) {
      dispatch({
        type: "AddAddressFail",
        payload: error.response.data.message,
      });
      toast.error("Failed to add Address");
    }
  };

export const editExistingAddress =
  (id, country, city, address1, address2) => async (dispatch) => {
    try {
      dispatch({ type: "UpdateAddressRequest" });
      const { data } = await axios.put(
        `${server}/user/update-address`,
        { id, country, city, address1, address2 },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "UpdateAddressSuccess", payload: data.user });
      toast.success("Address updated successfully");
    } catch (error) {
      dispatch({
        type: "UpdateAddressFail",
        payload: error.response.data.message,
      });
      toast.error("Address update failed");
    }
  };

export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteAddressRequest" });
    const { data } = await axios.put(
      `${server}/user/delete-address/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "DeleteAddressSuccess", payload: data.user });
    toast.success("Address deleted successfully");
  } catch (error) {
    dispatch({
      type: "DeleteAddressFail",
      payload: error.response.data.message,
    });
    toast.error("Address delete failed");
  }
};

export const updateInfo = (cPassword,name, email, phoneNumber) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateInfoRequest" });
    const { data } = await axios.put(
      `${server}/user/update-info`,
      {cPassword, name, email, phoneNumber },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "UpdateInfoSuccess", payload: data.user });
    toast.success("Info updated successfully");
  } catch (error) {
    dispatch({ type: "UpdateInfoFail", payload: error.response.data.message });
    toast.error("Info update failed");
  }
};

export const updatePassword=(cPassword,password)=>async(dispatch)=>{
  try {
    dispatch({ type: "UpdatePasswordRequest" });
    const { data } = await axios.put(
      `${server}/user/change-password`,
      { cPassword, password },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "UpdatePasswordSuccess", payload: data.user });
    toast.success("Password updated successfully");
  } catch (error) {
    dispatch({ type: "UpdatePasswordFail", payload: error.response.data.message });
    toast.error("Password update failed");
  }
}

