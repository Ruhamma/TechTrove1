import axios from "axios";
import React, { useState } from "react";
import { server } from "../server";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
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
      .post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        navigate("/");
        window.location.reload();

      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center pattern h-[100vh] text-black">
      <div className="sm:ml-3  w-[90%] sm:w-[550px]  shadow-lg rounded-lg bg-white/70 flex flex-col py-12 px-6 lg:px-4 ">
        <h1 className="mb-5 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-[90%] mx-auto"
        >
          <label className="block text-sm font-medium text-gray-700 mt-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <label className="block text-sm font-medium text-gray-700 mt-1">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
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
          <input
            type="submit"
            value="Login"
            onClick={handleSubmit}
            disabled={!validateForm()}
            className="  bg-slate-900 py-2 px-4 rounded-md text-white font-semibold cursor-pointer hover:bg-slate-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
          />
          <br />
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="text-blue-900 font-semibold" to="/signUp">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
