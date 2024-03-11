import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../server";
import { toast } from "react-toastify";

function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState(user && user.password);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    console.log("image change");

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res);
            toast.success("Image updated successfully");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Image update failed");
          });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddressChange = (e) => {
    e.preventDefault();
    console.log("address change");
  }
  return (
    <div>
      {user ? (
        <div>
          Profile
          <br />
          {user.name}
          <br />
          Phone number: {user.phoneNumber}
          <br />
          Email: {user.email}
          <br />
          {user.addresses[0] ? (
            <p>Address: {user.addresses[0]}  
              <form onSubmit={handleAddressChange}>

              </form>
            </p>
          ) : (
            <p>Address: No address</p>
          )}
          Address: {user.addresses[0]}
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
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default ProfilePage;
