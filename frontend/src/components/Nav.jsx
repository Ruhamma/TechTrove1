import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { RxAvatar } from "react-icons/rx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Collapsible from "react-collapsible";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
function Nav() {
  const { products } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [click, setClick] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const handleCategoryChange = (option) => {
    setSelectedCategory(option.value);
  };
  const handleClick = () => {
    setClick(!click);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const categories = [
    "Computers",
    "Phones",
    "Tablets",
    "Smart watches",
    "Cameras",
    "Tv & audio",
  ];
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchValue(term);

    const filteredData = products.filter((product) => {
      return product.productName.toLowerCase().includes(term.toLowerCase());
    });

    setSearchResult(filteredData);
  };
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResult(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center  justify-around py-3 ">
      <div className="md:hidden w-[33.3%] pl-5">
        <RxHamburgerMenu size={30} onClick={toggleMenu} />
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50  z-20">
          <div className="fixed top-0 left-0 h-full w-3/4 bg-slate-900 z-30 transition-all transform duration-300 ease-in-out">
            <div className="flex absolute top-2 right-2">
              <button className=" focus:outline-none" onClick={toggleMenu}>
                <IoMdClose className="text-3xl" />
              </button>
            </div>
            <div ref={searchRef} className="relative w-[90%] mx-auto mt-20">
              <input
                type="text"
                id="search"
                placeholder="Search for products..."
                value={searchValue}
                onChange={handleSearchChange}
                className="rounded-2xl text-black h-[40px] w-full px-2 text-[12px] sm:text-[13px] md:text-[15px] lg:text-[18px]"
              />
              <AiOutlineSearch
                color="black"
                className="absolute top-2 bottom-0 right-2 cursor-pointer text-[20px] md:text-[25px] lg:text-[30px]"
              />
              {searchResult && searchResult.length !== 0 ? (
                <div className="absolute rounded-lg w-full max-h-[50vh] overflow-y-scroll bg-white/55 shadow-sm-2 z-[9] p-4 flex flex-col gap-2  ">
                  {searchResult &&
                    searchResult.map((i, index) => {
                      return (
                        <Link
                          to={`/product/${i.productName}`}
                          onClick={() =>
                            (window.location.href = `/product/${i.productName}`)
                          }
                        >
                          <div className="w-full flex items-start-py-3 gap-4 items-center">
                            <img
                              src={`${i.images[0].url}`}
                              alt=""
                              className="w-[50px] h-[60px] mr-[10px] ml-4"
                            />
                            <h1 className="text-lg">{i.productName}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>{" "}
            <ul className="flex flex-col gap-9 p-4 mt-20 justify- h-full ">
              {categories.map((category) => (
                <li
                  key={category.name}
                  onClick={() => selectedCategory(category)}
                >
                  <Link
                    // to={`/products?category=${category}`}
                    className="text-xl cursor-pointer"
                  >
                    <p className="flex justify-between bg-slate-500/30 p-2 rounded-lg">
                      {category}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className=" hidden justify-center gap-5 w-[33.3%] md:flex ">
        <Link to="/" className=" ">
          Home
        </Link>
        <Link to="/about" className=" ">
          About
        </Link>
        <Link to="/contact" className=" ">
          Contact Us
        </Link>
        <div className=" relative flex ">
          <div className="dropdown-container w-fit" onClick={handleClick}>
            <Collapsible
              triggerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              trigger={
                <div className="flex items-center justify-center gap-1">
                  <span className="font-bold mb-3">Categories</span>
                  {!click ? (
                    <IoMdArrowDropdown className="  " />
                  ) : (
                    <IoMdArrowDropup className="" />
                  )}
                </div>
              }
              triggerClassName="collapsible-trigger"
              onClick={() => handleClick}
            >
              <div className="collapsible-content flex flex-col p-2 gap-2 justify-evenly bg-slate-500/20 rounded-sm w-fit ">
                <p
                  onClick={() => handleCategoryChange("Computers")}
                  className="cursor-pointer bg-slate-600/30 px-2 rounded-lg"
                >
                  Computers
                </p>
                <p
                  onClick={() => handleCategoryChange("Phones")}
                  className="cursor-pointer bg-slate-600/30 px-2 rounded-lg"
                >
                  Phones
                </p>
                <p
                  onClick={() => handleCategoryChange("Tablets")}
                  className="cursor-pointer bg-slate-600/30 px-2 rounded-lg"
                >
                  Tablets
                </p>
                <p
                  onClick={() => handleCategoryChange("Smart watches")}
                  className="cursor-pointer bg-slate-600/30 px-2 rounded-lg"
                >
                  Smart watches
                </p>
                <p
                  onClick={() => handleCategoryChange("Cameras")}
                  className="cursor-pointer bg-slate-600/30 px-2 rounded-lg"
                >
                  Cameras
                </p>
                <p
                  onClick={() => handleCategoryChange("Tv & audio")}
                  className="cursor-pointer bg-slate-600/30 px-2 rounded-lg"
                >
                  Tv & audio
                </p>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
      <p className="text-3xl md:text-3xl w-[42%]  text-center share-tech-regular">
        Tech Trove
      </p>

      <div className="flex gap-2 md:gap-10 w-[32%] justify-center items-center">
        <AiOutlineShoppingCart
          color="white"
          title="Add to cart"
          className="cursor-pointer text-[20px] md:text-[25px] lg:text-[30px] "
          size={30}
        />
        <Link to={`/wishlist`}>
          <AiOutlineHeart
            color="white"
            title="Add to cart"
            className="cursor-pointer text-[20px] hidden md:block md:text-[25px] lg:text-[30px] "
            size={30}
          />
        </Link>
        {isAuthenticated ? (
          user?.avatar?.url ? (
            <Link to="/profile">
              <img
                src={user.avatar.url}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </Link>
          ) : (
            <Link to="/profile">
              <Avatar name={user.name} size="30" round={true} color="#07092e" />
            </Link>
          )
        ) : (
          <Link to="/login">
            <RxAvatar size={30} color="white" className="" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Nav;
