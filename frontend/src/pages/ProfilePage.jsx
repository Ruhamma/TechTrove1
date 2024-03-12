import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../server";
import { toast } from "react-toastify";
import {
  addAddress,
  deleteUserAddress,
  editExistingAddress,
  logout,
  updateAddress,
  updateInfo,
  updatePassword,
  updateUserImage,
} from "../redux/actions/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  country: "",
  city: "",
  address1: "",
  address2: "",
};
function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [editAddress, setEditAddress] = useState(null);
  const [editInfo, setEditInfo] = useState(null);
  const [editAddressValues, setEditAddressValues] = useState(initialState);
  const [address, setAddress] = useState(initialState);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleImageChange = async (e) => {
    console.log("image change");

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        const avatar = reader.result;
        dispatch(updateUserImage(avatar));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddressChange = (e) => {
    e.preventDefault();
    dispatch(
      addAddress(
        address.country,
        address.city,
        address.address1,
        address.address2
      )
    );
    setAddress(initialState);
  };

  const handleDeleteAddress = (address) => {
    const id = address._id;
    console.log(id);
    dispatch(deleteUserAddress(id));
  };
  const handleEditAddress = (address) => {
    setEditAddress(address);
    setEditAddressValues(address);
  };
  const handleCancelEdit = () => {
    setEditAddress(null); // Cancel editing and reset the edit mode
    setEditAddressValues(initialState);
  };
  const handleSaveAddress = () => {
    dispatch(
      editExistingAddress(
        editAddress._id,
        editAddressValues.country,
        editAddressValues.city,
        editAddressValues.address1,
        editAddressValues.address2
      )
    );
    // setEditAddress(null); // Reset the edit mode
    // setEditAddressValues(initialState);
  };
  const handleEditInfo = () => {
    setEditInfo("start");
  };
  const handleCancelInfo = () => {
    setEditInfo(null);
  };
  const handleSaveInfo = () => {
    dispatch(updateInfo(cPassword, name, email, phoneNumber));
    setEditInfo(null);
    setcPassword("");
  };
  const handleChangePassword = () => {
    dispatch(updatePassword(cPassword, password));
    setPassword("");
    setcPassword("");
  };
  const validatePassword = () => {
    if (password.length < 8 || cPassword.length < 8) {
      return false;
    } else {
      return true;
    }
  };

  const handleLogout=()=>{
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }
  return (
    <div>
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          Profile
          <br />
          {editInfo === "start" ? (
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            user.name
          )}
          <br />
          {editInfo === "start" ? (
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          ) : (
            user.email
          )}
          <br />
          {editInfo === "start" ? (
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          ) : (
            user.phoneNumber
          )}
          <br />
          {editInfo === "start" ? (
            <p>
              password:{" "}
              <input
                type="text"
                value={cPassword}
                onChange={(e) => {
                  setcPassword(e.target.value);
                }}
              />
            </p>
          ) : null}
          {editInfo === "start" ? (
            <div>
              <button onClick={handleSaveInfo}>Save</button>
              <button onClick={handleCancelInfo}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleEditInfo}>edit</button>
          )}
          {user.addresses ? (
            <div>
              <p>
                {user.addresses &&
                  user.addresses.map((address, index) => {
                    return (
                      <div key={index}>
                        <p>
                          Country:{" "}
                          {editAddress === address ? (
                            <input
                              type="text"
                              value={editAddressValues.country}
                              onChange={(e) => {
                                setEditAddressValues({
                                  ...editAddressValues,
                                  country: e.target.value,
                                });
                              }}
                            />
                          ) : (
                            address.country
                          )}
                        </p>
                        <p>
                          City:
                          {editAddress === address ? (
                            <input
                              type="text"
                              value={editAddressValues.city}
                              onChange={(e) => {
                                setEditAddressValues({
                                  ...editAddressValues,
                                  city: e.target.value,
                                });
                              }}
                            />
                          ) : (
                            address.city
                          )}
                        </p>
                        <p>
                          Address1:
                          {editAddress === address ? (
                            <input
                              type="text"
                              value={editAddressValues.address1}
                              onChange={(e) => {
                                setEditAddressValues({
                                  ...editAddressValues,
                                  address1: e.target.value,
                                });
                              }}
                            />
                          ) : (
                            address.address1
                          )}
                        </p>
                        <p>
                          Address2:
                          {editAddress === address ? (
                            <input
                              type="text"
                              value={editAddressValues.address2}
                              onChange={(e) => {
                                setEditAddressValues({
                                  ...editAddressValues,
                                  address2: e.target.value,
                                });
                              }}
                            />
                          ) : (
                            address.address2
                          )}
                        </p>
                        <button onClick={() => handleDeleteAddress(address)}>
                          Delete
                        </button>
                        {editAddress === address ? (
                          <div>
                            <button onClick={handleSaveAddress}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => handleEditAddress(address)}>
                            Edit
                          </button>
                        )}
                      </div>
                    );
                  })}
              </p>
              <form onSubmit={handleAddressChange}>
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                />
                &nbsp;&nbsp;
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
                <br />
                <label>Address1</label>
                <input
                  type="text"
                  placeholder="Address1"
                  value={address.address1}
                  onChange={(e) =>
                    setAddress({ ...address, address1: e.target.value })
                  }
                />
                &nbsp;&nbsp;
                <label>Address2</label>
                <input
                  type="text"
                  placeholder="Address2"
                  value={address.address2}
                  onChange={(e) =>
                    setAddress({ ...address, address2: e.target.value })
                  }
                />
                <button type="submit">Save</button>
              </form>
            </div>
          ) : (
            <p>
              Address: No address
              <form onSubmit={handleAddressChange}>
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                />
                &nbsp;&nbsp;
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
                <br />
                <label>Address1</label>
                <input
                  type="text"
                  placeholder="Address1"
                  value={address.address1}
                  onChange={(e) =>
                    setAddress({ ...address, address1: e.target.value })
                  }
                />
                &nbsp;&nbsp;
                <label>Address2</label>
                <input
                  type="text"
                  placeholder="Address2"
                  value={address.address2}
                  onChange={(e) =>
                    setAddress({ ...address, address2: e.target.value })
                  }
                />
                <button type="submit">Save</button>
              </form>
            </p>
          )}
          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              alt=""
            />
          ) : (
            <p>high</p>
          )}
          <input type="file" id="image" onChange={handleImageChange} />
          {/* here we can add image or edit image if there's already an image */}
          Old Password:
          <input
            type="text"
            value={cPassword}
            onChange={(e) => {
              setcPassword(e.target.value);
            }}
          />
          New Password:
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleChangePassword} disabled={!validatePassword()}>
            Change Password
          </button>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default ProfilePage;
