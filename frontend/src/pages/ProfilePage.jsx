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
            { withCredential: true }
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
  };
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
        Address: {user.addresses[0]}
        <button onClick={handleImageChange}>Add Image</button>
        {/* here we can add image or edit image if there's already an image */}
      </div>
     ) : (
      <p>loading</p>
     )}
    </div>
  );
}

export default ProfilePage;
