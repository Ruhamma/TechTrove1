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
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Avatar from "react-avatar";
import { IoPerson, IoPersonSharp } from "react-icons/io5";
import { MdEmail, MdOutlinePerson } from "react-icons/md";
import { FaAddressBook, FaRegAddressBook } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import { CiShoppingCart } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getUserOrder } from "../redux/actions/order";

const initialState = {
  country: "",
  city: "",
  address1: "",
  address2: "",
};
function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
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
  const [selectedInfo, setSelectedInfo] = useState("personal");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserOrder(user._id));
  }, [dispatch, user._id]);

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

  const handleLogout = () => {
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
  };

  const handleClick = (info) => {
    setSelectedInfo(info);
  };
  return (
    <div>
      {user ? (
        <div>
          <Nav />
          <div className="m-10 bg-slate-800/50 p-5 rounded-md flex min-h-[80vh] w-[80%] mx-auto">
            {/* Profile side bar */}
            <div className="bg-slate-700 w-[20%] rounded-lg">
              <div className=" rounded-lg flex flex-col items-center justify-center pt-5 ">
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-slate-900"
                    alt=""
                  />
                ) : (
                  <Avatar
                    name={user.name}
                    size={150}
                    round={true}
                    color="#07092e"
                  />
                )}
                <p className="text-xl font-bold ">{user.name}</p>
              </div>

              <div className="flex flex-col gap-6  mt-10">
                <div
                  className={`flex items-end gap-2 cursor-pointer hover:border-l-2 hover:bg-slate-800 border-white  p-2 ${
                    selectedInfo === "personal" ? "border-l-2 bg-slate-800" : ""
                  }`}
                  onClick={() => handleClick("personal")}
                >
                  <MdOutlinePerson size={30} />
                  <p className="text">Personal Information</p>
                </div>
                <div
                  className={`flex items-end gap-2 cursor-pointer hover:border-l-2 hover:bg-slate-800 border-white  p-2 ${
                    selectedInfo === "addresses"
                      ? "border-l-2 bg-slate-800"
                      : ""
                  }`}
                  onClick={() => handleClick("addresses")}
                >
                  <FaRegAddressBook size={30} />
                  <p className="">Addresses</p>
                </div>
                <div
                  className={`flex items-end gap-2 cursor-pointer hover:border-l-2 hover:bg-slate-800 border-white  p-2 ${
                    selectedInfo === "password" ? "border-l-2 bg-slate-800" : ""
                  }`}
                  onClick={() => handleClick("password")}
                >
                  <TbPasswordUser size={30} />
                  <p className="">Password</p>
                </div>
                <div
                  className={`flex items-end gap-2 cursor-pointer hover:border-l-2 hover:bg-slate-800 border-white  p-2 ${
                    selectedInfo === "orders" ? "border-l-2 bg-slate-800" : ""
                  }`}
                  onClick={() => handleClick("orders")}
                >
                  <CiShoppingCart size={30} />
                  <p className="">Orders</p>
                </div>
                <div
                  className={`flex items-end gap-2 text-red-500 pb-2 cursor-pointer hover:border-l-2 hover:bg-slate-800 border-white  p-2 `}
                  onClick={handleLogout}
                >
                  <IoMdLogOut size={30} className="t" />
                  <p>Logout</p>
                </div>
              </div>
            </div>
            <div className="w-[80%]">
              {selectedInfo === "personal" ? (
                <div className="pl-10 h-full">
                  <div className="flex items-center ">
                    <BsInfoCircle size={50} />
                    <div className="pl-2">
                      <h1 className="bold text-4xl text-slate-300">
                        Personal Information
                      </h1>
                      <p className="text-gray-500">
                        By clicking on the edit button you can easily update
                        your information as needed
                      </p>
                    </div>
                  </div>
                  {editInfo === "start" ? (
                    <div className="flex flex-col gap-5 pt-10 mt-2">
                      <div className="flex items-center gap-2">
                        <IoPersonSharp
                          size={40}
                          className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                        />
                        <div className="w-[40%]">
                          <p className="text-gray-500">Name</p>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            className="w-full bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdEmail
                          size={40}
                          className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                        />
                        <div className="w-[40%]">
                          <p className="text-gray-500">Email</p>
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            className="w-full bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhoneAlt
                          size={40}
                          className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                        />
                        <div className="w-[40%]">
                          <p className="text-gray-500">Phone Number</p>
                          <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                            }}
                            className="w-full bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <RiLockPasswordLine
                          size={40}
                          className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                        />
                        <div className="w-[40%]">
                          <p className="text-gray-500">
                            Enter password to edit
                          </p>
                          <input
                            type="text"
                            value={cPassword}
                            onChange={(e) => {
                              setcPassword(e.target.value);
                            }}
                            className="w-full bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 pt-10 mt-2 ">
                      <div className="flex items-center gap-2">
                        <IoPersonSharp
                          size={40}
                          className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                        />
                        <div className="w-[40%]">
                          <p className="text-gray-500">Name</p>
                          <p className="bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800">
                            {user.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdEmail
                          size={40}
                          className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                        />
                        <div className="w-[40%]">
                          <p className="text-gray-500">Email</p>
                          <p className="bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhoneAlt
                          size={40}
                          className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                        />
                        <div className="w-[40%]">
                          <p className="text-gray-500 ">Phone Number</p>
                          <p className="bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800">
                            {user.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {editInfo === "start" ? (
                    <div className="">
                      <button
                        onClick={handleSaveInfo}
                        className=" mt-10 mx-5 rounded-lg px-10 py-2 bg-slate-500 hover:bg-slate-800 "
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelInfo}
                        className=" mt-10 rounded-lg px-10 py-2 bg-slate-500 hover:bg-slate-800 mx-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEditInfo}
                      className=" mt-10 rounded-lg px-10 py-2 bg-slate-500 hover:bg-slate-800 mx-auto"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ) : selectedInfo === "addresses" ? (
                <div>
                  {user.addresses ? (
                    <div className="pl-10 h-full">
                      <div className="flex items-center ">
                        <FaRegAddressBook size={50} />
                        <div className="pl-2">
                          <h1 className="bold text-4xl text-slate-300">
                            Addresses
                          </h1>
                          <p className="text-gray-500">
                            By clicking on the edit button you can easily update
                            your information as needed
                          </p>
                        </div>
                      </div>
                      <form
                        onSubmit={handleAddressChange}
                        className="flex flex-col gap-5 pt-10 mt-2"
                      >
                        <div className="bg-slate-800 p-2 rounded py-6">
                          <div className="flex justify-center gap-20">
                            <div className="flex items-center gap-2 ">
                              <IoPersonSharp
                                size={40}
                                className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                              />
                              <div className="w-[50%]">
                                <p className="text-gray-500">Country</p>
                                <input
                                  type="text"
                                  placeholder="Enter country..."
                                  value={address.country}
                                  onChange={(e) =>
                                    setAddress({
                                      ...address,
                                      country: e.target.value,
                                    })
                                  }
                                  className="bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <IoPersonSharp
                                size={40}
                                className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                              />
                              <div className="w-[50%]">
                                <p className="text-gray-500">City</p>
                                <input
                                  type="text"
                                  placeholder="Enter city"
                                  value={address.city}
                                  onChange={(e) =>
                                    setAddress({
                                      ...address,
                                      city: e.target.value,
                                    })
                                  }
                                  className="bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center gap-20">
                            <div className="flex items-center gap-2">
                              <FaAddressBook
                                size={40}
                                className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                              />
                              <div className="w-[50%]">
                                <p className="text-gray-500">Address 1</p>
                                <input
                                  type="text"
                                  placeholder="Address1"
                                  value={address.address1}
                                  onChange={(e) =>
                                    setAddress({
                                      ...address,
                                      address1: e.target.value,
                                    })
                                  }
                                  className="bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaAddressBook
                                size={40}
                                className=" box-shadow shadow-sm shadow-white p-2 rounded-full"
                              />
                              <div className="w-[50%]">
                                <p className="text-gray-500">Address 2</p>
                                <input
                                  type="text"
                                  placeholder="Address2"
                                  value={address.address2}
                                  onChange={(e) =>
                                    setAddress({
                                      ...address,
                                      address2: e.target.value,
                                    })
                                  }
                                  className="bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-slate-800"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className=" mt-2 mx-auto rounded-lg px-10 py-2 hover:bg-slate-500 bg-slate-800 w-[40%]"
                        >
                          Enter
                        </button>
                      </form>
                      <div>
                        <p className="text-2xl text-slate-300 my-10 mt- text-center">
                          Previous addresses
                        </p>
                        {user.addresses && (
                          <table className="w-full divide-y-2 bg-slate-900/20 border-collapse rounded-md">
                            <thead>
                              <tr className="text-left">
                                <th>Country</th>
                                <th>City</th>
                                <th>Address 1</th>
                                <th>Address 2</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.addresses.map((address, index) => (
                                <tr key={index}>
                                  <td className="mb-2">
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
                                        className="w-ful bg-slate-500/10 px-1   rounded border-2 border-slate-800"
                                      />
                                    ) : (
                                      <p className="w-full">
                                        {address.country}
                                      </p>
                                    )}
                                  </td>
                                  <td className="mb-2">
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
                                        className="w-ful bg-slate-500/10 px-1   rounded border-2 border-slate-800"
                                      />
                                    ) : (
                                      <p className="w-full">{address.city}</p>
                                    )}
                                  </td>
                                  <td className="mb-2">
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
                                        className="w-ful bg-slate-500/10 px-1   rounded border-2 border-slate-800"
                                      />
                                    ) : (
                                      <p className="w-full">
                                        {address.address1}
                                      </p>
                                    )}
                                  </td>
                                  <td className="mb-2">
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
                                        className="w-ful bg-slate-500/10 px-1   rounded border-2 border-slate-800"
                                      />
                                    ) : (
                                      <p className="w-full">
                                        {address.address2}
                                      </p>
                                    )}
                                  </td>
                                  <td className="mb-10 w-fit">
                                    {editAddress === address ? (
                                      <div>
                                        <button
                                          onClick={handleSaveAddress}
                                          className="rounded-l-lg px-2 py-1 bg-slate-700 hover:bg-slate-800 border-r-2 border-slate-500 transition-color duration-700 "
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={handleCancelEdit}
                                          className="rounded-r-lg px-2 py-1 bg-slate-700 hover:bg-slate-800 transition-color duration-700 "
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="w-full">
                                        <button
                                          onClick={() =>
                                            handleEditAddress(address)
                                          }
                                          className="rounded-l-lg px-2 py-1 bg-slate-700 hover:bg-slate-800 border-r-2 border-slate-500 transition-color duration-700 "
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDeleteAddress(address)
                                          }
                                          className="rounded-r-lg px-2 py-1 bg-slate-700 hover:bg-slate-800 transition-color duration-700 "
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              ) : selectedInfo === "password" ? (
                <div className="pl-10 h-full">
                  <div className="flex items-center ">
                    <TbPasswordUser size={50} />
                    <div className="pl-2">
                      <h1 className="bold text-4xl text-slate-300">Password</h1>
                      <p className="text-gray-500">
                        By clicking on the change password button you can easily
                        update your password
                      </p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <p> Old Password</p>
                    <input
                      type="password"
                      value={cPassword}
                      onChange={(e) => {
                        setcPassword(e.target.value);
                      }}
                      className="w-full bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-white"
                    />
                  </div>
                  <div className="mt-10">
                    <p> New Password</p>
                    <div className="relative">
                      <input
                        type={visible ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="w-full bg-slate-500/10 p-2 py-2 mt-1 rounded border-2 border-white"
                      />
                      {visible ? (
                        <AiOutlineEye
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(false)}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(true)}
                        />
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    disabled={!validatePassword()}
                    className="cursor-pointer mt-10 rounded-lg px-10 py-2 bg-slate-500 hover:bg-slate-800 mx-auto"
                  >
                    Change Password
                  </button>{" "}
                </div>
              ) : (
                <div className="pl-10 h-full">
                  <div className="flex items-center ">
                    <CiShoppingCart size={50} />
                    <div className="pl-2">
                      <h1 className="bold text-4xl text-slate-300">
                        Your Orders
                      </h1>
                      <p className="text-gray-500">
                        You can check your order status here
                      </p>
                    </div>
                  </div>
                  {order && order.length > 0 ? (
                    <ul
                      className="mt-5 space-y-6 "
                    >
                      {order.map((order) => (
                        <li
                          key={order._id}
                          className="flex justify-between items-center bg-slate-800 py-6 p-2 shadow-md shadow-white/40"
                        >
                          <div>
                            {order.cart.cart.map((i, index) => {
                              return (
                                <div key={index}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={i.images[0].url}
                                      alt="picture"
                                      className="w-[50px] h-[50px] object-cover object-center mb-2"
                                    />
                                    <div>
                                      <Link to={`/product/${i.productName}`}>
                                        <p className="text-lg font-thin pl-2">
                                          {i.productName} x{" "}
                                          <span className="text-gray-500">
                                            {order.cart.quantities[index]}
                                          </span>
                                        </p>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-lg">
                            USD{" "}
                            <span className="text-gray-500">
                              {order.totalPrice}
                            </span>
                          </p>
                          <div>
                            <p
                              className={`${
                                order.status === "Delivered"
                                  ? "bg-green-800"
                                  : "bg-red-900"
                              } p-2 px-4`}
                            >
                              {order.status}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No orders found.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              alt=""
            />
          ) : (
            <p>high</p>
          )}
          <input type="file" id="image" onChange={handleImageChange} /> */}
          {/* here we can add image or edit image if there's already an image */}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default ProfilePage;
