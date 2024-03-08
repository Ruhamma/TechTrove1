import axios from "axios";
import React, { useState } from "react";
import { server } from "../server";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (email === "" || password === "") {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${server}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="submit"
          value="Login"
          onClick={handleSubmit}
          disabled={!validateForm()}
        />
        <br />
      </form>
    </div>
  );
}

export default Login;
