import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { RxAvatar } from "react-icons/rx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import Collapsible from "react-collapsible";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { removeFromWishlist } from "../redux/actions/wishlist";
import { addToCart } from "../redux/actions/cart";
function Nav() {
  const { products } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [click, setClick] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [openWishlist, setOpenWishlist] = useState(false);
  const navigate = useNavigate();
  const handleCategoryChange = (option) => {
    setSelectedCategory(option);
    navigate(`/products?category=${option}`);
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
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };
  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
  };
  return (
    <div className="flex items-center justify-around py-3 fixed top-0 w-full bg-[#030312] z-50 ">
      <div className="md:hidden w-[33.3%] pl-5">
        <RxHamburgerMenu size={30} onClick={toggleMenu} />
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50  z-20">
          <div className="fixed top-0 left-0 h-full w-3/4 bg-[#030312] z-30 transition-all transform duration-300 ease-in-out">
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
                <div className="absolute rounded-lg w-full max-h-[50vh] overflow-y-scroll bg-white/90 text-slate-900 shadow-sm-2 z-[9] p-4 flex flex-col gap-2  ">
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
            <ul className="flex flex-col gap-9 p-4 mt-20  h-full ">
              {categories.map((category) => (
                <li
                  key={category.name}
                  onClick={() => handleCategoryChange(category)}
                >
                  <Link
                    // to={`/products?category=${category}`}
                    className="text-xl cursor-pointer"
                  >
                    <p className="flex justify-between bg-slate-500/70 p-2 rounded-lg">
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
        <div className=" relative flex z-30 ">
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
              <div className="collapsible-content flex flex-col p-2 gap-2 justify-evenly bg-slate-700 rounded-sm w-fit ">
                <p
                  onClick={() => handleCategoryChange("Computers")}
                  className="cursor-pointer bg-slate-400/30 px-2 rounded-lg"
                >
                  Computers
                </p>
                <p
                  onClick={() => handleCategoryChange("Phones")}
                  className="cursor-pointer bg-slate-400/30 px-2 rounded-lg"
                >
                  Phones
                </p>
                <p
                  onClick={() => handleCategoryChange("Tablets")}
                  className="cursor-pointer bg-slate-400/30 px-2 rounded-lg"
                >
                  Tablets
                </p>
                <p
                  onClick={() => handleCategoryChange("Smart watches")}
                  className="cursor-pointer bg-slate-400/30 px-2 rounded-lg"
                >
                  Smart watches
                </p>
                <p
                  onClick={() => handleCategoryChange("Cameras")}
                  className="cursor-pointer bg-slate-400/30 px-2 rounded-lg"
                >
                  Cameras
                </p>
                <p
                  onClick={() => handleCategoryChange("Tv & audio")}
                  className="cursor-pointer bg-slate-400/30 px-2 rounded-lg"
                >
                  Tv & audio
                </p>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>

      <Link
        className="text-3xl md:text-3xl w-[42%]  text-center share-tech-regular"
        to="/"
      >
        Tech Trove
      </Link>

      <div className="flex gap-2 md:gap-10 w-[32%] justify-center items-center">
        <div className="relative">
          <Link to="/cart">
            <IoBagOutline
              color="white"
              title="Add to cart"
              className="cursor-pointer text-[20px] md:text-[25px] lg:text-[30px] "
              size={30}
            />
          </Link>
          <span className="absolute top-0 right-0 rounded-full w-3 h-3 border-slate-900 md:w-3 md:h-3 lg:w-4 lg:h-4 text-center bg-slate-700 text-white text-[9px] md:text-[9px] lg:text-[12px]">
            {cart && cart.length}
          </span>
        </div>
        <div className="relative hidden md:block">
          <AiOutlineHeart
            color="white"
            title="Add to cart"
            className="cursor-pointer text-[20px]  md:text-[25px] lg:text-[30px] "
            size={30}
            onClick={() => setOpenWishlist(true)}
          />
          <span className="absolute top-0 right-0 rounded-full w-3 h-3 border-slate-900 md:w-3 md:h-3 lg:w-4 lg:h-4 text-center bg-slate-700 text-white text-[9px] md:text-[9px] lg:text-[12px]">
            {wishlist && wishlist.length}
          </span>
        </div>
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
      {openWishlist ? (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 z-50">
          <div className="overflow-y-scroll fixed top-0 right-0 w-full sm:w-[70%] lg:w-[60%] xl:w-[40%]  text-white  h-full flex flex-col  bg-slate-900/70 shadow-sm">
            <div className="flex justify-between items-center p-5 mb-10">
              <h1 className="text-3xl font-bold">Wishlist</h1>
              <IoMdClose
                className="text-3xl cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <div className="flex flex-col gap-20 p-5 ">
              {wishlist.length === 0 ? (
                <h1 className="text-xl text-center">No items in wishlist</h1>
              ) : (
                wishlist.map((i, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-10 "
                    >
                      <div className="flex gap-5">
                        <img
                          src={i.images[0].url}
                          alt="picture"
                          className="w-[80px] h-[80px] md:w-[106px] md:h-[106px] object-cover object-center"
                        />
                        <div>
                          <Link to={`/product/${i.productName}`}>
                            <p className="text-base sm:text-lg md:text-xl font-semibold pb-3">
                              {i.productName}
                            </p>
                          </Link>
                          <p className="text-sm md:text-base text-gray-500 pb-2">
                            {i.category}
                          </p>
                          <p className="text-sm md:text-lg pb-2 hidden md:block">
                            $ {i.discountPrice}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <button
                          className="bg-slate-500/30 py-2 px-5 rounded-lg"
                          onClick={() => addToCartHandler(i)}
                        >
                          {/* Add to cart */}
                          <AiOutlineShoppingCart />
                        </button>
                        <button
                          className="bg-slate-500/10 py-2 px-5 rounded-lg"
                          onClick={() => removeFromWishlistHandler(i)}
                        >
                          {/* Remove */}
                          <FaRegTrashCan color="white" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Nav;
