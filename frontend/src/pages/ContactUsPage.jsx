import React, { useState } from "react";
import Nav from "../components/Nav";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import { server } from "../server";
import Footer from "../components/Footer";
function ContactUsPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [suggestion, setSuggestion] = useState();

  const handleSubmit = (e) => {
    e.preventDefault(e);
    axios
      .post(`${server}/user/addComment`, {
        name,
        email,
        suggestion,
      })
      .then((res) => {
        toast.success("Thank you for you suggestion!!");
        setName("");
        setEmail("");
        setSuggestion("");
      })
      .catch((error) => {
        toast.error("Couldn't send try again");
      });
  };
  return (
    <div className="pattern">
      <Nav />
      <div className="flex justify-center items-center flex-col mt-32 ">
        <p className="text-4xl share-tech-regular">Contact us</p>
        <p className="text-lg text-gray-500">
          Write any of you suggestions down below
        </p>
      </div>

      <div className="relative flex sm:flex-col flex-col-reverse">
        <div className="flex justify-center item flex-col sm:flex-row gap-10 md:gap-20 mt-20 z-20">
          <div className="bg-blue-100/20 rounded-lg text-black flex-col flex items-center justify-center p-5 shadow-lg shadow-white/20 mx-auto sm:mx-0 w-[90%] sm:w-40 md:w-[23.3%]">
            <FaLocationDot size={50} />
            <p className="text-xl share-tech-regular text-slate-200">
              Location
            </p>
            <p className=" text-gray-500 text-center">
              123, Main Street, New York, NY 10030
            </p>
          </div>
          <div className="bg-blue-100/20 rounded-lg text-black flex-col flex items-center justify-center p-5 shadow-lg shadow-white/20 mx-auto sm:mx-0 w-[90%] sm:w-40 md:w-[23.3%]">
            <FaPhone size={50} />
            <p className="text-xl share-tech-regular text-slate-200">Phone</p>
            <p className=" text-gray-500 text-center">+1 123 456 7890</p>
          </div>
          <div className="bg-blue-100/20 rounded-lg text-black flex-col flex items-center justify-center p-5 shadow-lg shadow-white/20 mx-auto sm:mx-0 w-[90%] sm:w-40 md:w-[23.3%]">
            <MdEmail size={50} />
            <p className="text-xl share-tech-regular text-slate-200">Email</p>
            <p className=" text-gray-500 text-center">info@share.com</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center gap-5 flex-col mt-10 bg-slate-500/50 w-[90%] md:w-[60%] lg:w-[45%] p-5 sm:p-10 mx-auto pt-12 rounded-xl "
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400 mt-1"
            >
              Full Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              placeholder="Enter your full name"
              type="text"
              className="mt-1 text-slate-900 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mt-1"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="Enter a valid email address"
              type="email"
              className="mt-1 text-slate-900 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-400 mt-1"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={suggestion}
              onChange={(e) => {
                setSuggestion(e.target.value);
              }}
              required
              rows="10"
              className="mt-1 text-slate-900 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <input
            type="submit"
            value="Contact"
            className="bg-slate-900  py-2 px-4 rounded-md text-white font-semibold cursor-pointer hover:bg-slate-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUsPage;
