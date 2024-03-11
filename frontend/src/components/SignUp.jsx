import axios from "axios";
import React, { useState } from "react";
import { server } from "../server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validateForm = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(e);
    axios
      .post(`${server}/user/signUp`, {
        name,
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      SignUp
      <form onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button disabled={!validateForm()} type="submit">
          SignUp
        </button>
      </form>
    </div>
  );
}

export default SignUp;
