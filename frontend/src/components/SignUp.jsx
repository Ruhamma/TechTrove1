import axios from "axios";
import React, { useState } from "react";
import { server } from "../server";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex items-center justify-center pattern h-[100vh] text-black">
      <div className="sm:ml-3  w-[90%] sm:w-[550px]  shadow-lg rounded-lg bg-white/70 flex flex-col py-12 px-6 lg:px-4 ">
        <h1 className="mb-5 text-center text-3xl font-extrabold text-gray-900">
          SignUp
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-[90%] mx-auto"
        >
          <label className="block text-sm font-medium text-gray-700 mt-1">
            Full Name <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700 mt-1">
            Email <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700 mt-1">
            Password <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700 mt-1">
            Confirm Password <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            disabled={!validateForm()}
            type="submit"
            className="bg-slate-900  disabled:bg-slate-500 py-2 px-4 rounded-md text-white font-semibold cursor-pointer hover:bg-slate-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
          >
            SignUp
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-blue-900 font-semibold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
