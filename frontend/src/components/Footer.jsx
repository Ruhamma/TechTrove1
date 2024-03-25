import React from "react";
import { FaFacebook, FaTwitter, FaTelegram, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="flex md:gap-0 gap-10  md:flex-row flex-col md:justify-around items-center  bg-[#030312] text-white p-10 mt-10">
        <div className="flex flex-col gap-2 md:items-start items-center">
          <p className="text-3xl font-bold share-tech-regular">Tech Trove</p>
          <p className="text-sm text-gray-500 text-center md:text-left">
            123, Main Street, New York, <br /> NY 10030
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-start items-center">
          <p className="text-lg ">Navigation</p>
          <Link to="/about" className="text-sm text-gray-500">
            About us
          </Link>
          <Link to="/contact" className="text-sm text-gray-500">
            Contact us
          </Link>
          <p className="text-sm text-gray-500">Privacy Policy</p>
          <p className="text-sm text-gray-500">Terms of Service</p>
        </div>
        <div className="flex flex-col gap-2 md:items-start items-center">
          <p className="text-lg ">Categories</p>
          <Link
            to="/products?category=computers"
            className="text-sm text-gray-500"
          >
            Computers
          </Link>
          <Link
            to="/products?category=phones"
            className="text-sm text-gray-500"
          >
            Phones
          </Link>
          <Link
            to="/products?category=tablets"
            className="text-sm text-gray-500"
          >
            Tablets
          </Link>
          <Link
            to="/products?category=cameras"
            className="text-sm text-gray-500"
          >
            Cameras
          </Link>
        </div>

        <div className="flex gap-5">
          <FaFacebook size={25} className="text-slate-500" />
          <FaTwitter size={25} className="text-slate-500" />
          <FaTelegram size={25} className="text-slate-500" />
          <FaInstagram size={25} className="text-slate-500" />
        </div>
      </div>
      <div className="bg-[#030312] text-gray-400 text-center p-5">
        <hr />
        <p className="text-sm mt-5">© 2024 Tech Trove. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
