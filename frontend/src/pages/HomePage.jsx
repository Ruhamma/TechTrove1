import React, { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard.jsx";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../redux/actions/cart.js";
import { AiOutlineSearch } from "react-icons/ai";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Footer from "../components/Footer.jsx";
function HomePage() {
  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };
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
  const splideOptions1 = {
    type: "loop",
    perPage: 4,
    perMove: 1,
    breakpoints: {
      1245: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      576: {
        perPage: 2,
      },
    },
  };

  return (
    <div className="h-[100vh] pattern">
      <Nav />
      <div className="w-full text-center h-[80vh]  flex-col flex gap-4 justify-center items-center mt-20">
        <p className="tex-lg sm:text-xl md:text-2xl">
          Tech Made Easy. Shop Now.
        </p>
        <p className="share-tech-regular font-bold px-2 sm:p-1 text-5xl  sm:text-5xl md:text-6xl">
          Your Destination for Cutting-Edge
          <span className="text-blue-900 ml-2">Electronics</span>.
        </p>
        <p className="text-lg sm:text-xl px-2 text-gray-500">
          Shop the latest and greatest electronics. Find everything you need to
          stay ahead of the curve
        </p>
        <div
          ref={searchRef}
          className="relative w-[90%] sm:w-[60%] mx-auto mt-10 z-10"
        >
          <input
            type="text"
            id="search"
            placeholder="Search for products..."
            value={searchValue}
            onChange={handleSearchChange}
            className="rounded-2xl text-black  h-[40px] w-full px-2 text-[15px]  lg:text-[18px]"
          />
          <AiOutlineSearch
            // onClick={handleSearchClick}
            color="black"
            className="absolute top-1 bottom-0 right-2 cursor-pointer text-[25px] lg:text-[30px]"
          />
          {searchResult && searchResult.length !== 0 ? (
            <div className="absolute rounded-lg w-full max-h-[50vh] overflow-y-scroll bg-white/90 text-slate-800 shadow-sm-2 z-[9] p-4 flex flex-col gap-2  ">
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
      </div>
      <div className="flex flex-wrap gap-y-10  gap-4 sm:gap-20 p-10  justify-evenly items-center md:pb-20 lg:pb-10">
        <div
          className="flex flex-col justify-center items-center w-fit gap-2 cursor-pointer"
          onClick={() => {
            navigate(`/products?category=computers`);
          }}
        >
          <div className="bg-white/30 w-fit rounded-full p-5 ">
            <img
              src="/images/pngwing.com (6).png"
              alt=""
              className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] object-cover object-center "
            />
          </div>
          <p className="share-tech-regular text-slate-500 text-xl">Computers</p>
        </div>
        <div
          className="flex flex-col justify-center items-center w-fit gap-2  cursor-pointer"
          onClick={() => {
            navigate(`/products?category=phones`);
          }}
        >
          <div className="bg-white/30 w-fit rounded-full p-5">
            <img
              src="/images/pngwing.com (7).png"
              alt=""
              className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] object-cover object-center "
            />
          </div>
          <p className="share-tech-regular text-slate-500 text-xl">Phones</p>
        </div>
        <div
          className="flex flex-col justify-center items-center w-fit gap-2  cursor-pointer"
          onClick={() => {
            navigate(`/products?category=tablets`);
          }}
        >
          <div className="bg-white/30 w-fit rounded-full p-5">
            <img
              src="/images/pngwing.com (8).png"
              alt=""
              className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] object-cover object-center "
            />
          </div>
          <p className="share-tech-regular text-slate-500 text-xl">Tablets</p>
        </div>
        <div
          className="flex flex-col justify-center items-center w-fit gap-2  cursor-pointer"
          onClick={() => {
            navigate(`/products?category=smart watches`);
          }}
        >
          <div className="bg-white/30 w-fit rounded-full p-5">
            <img
              src="/images/pngwing.com (9).png"
              alt=""
              className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] object-cover object-center "
            />
          </div>
          <p className="share-tech-regular text-slate-500 text-xl">
            Smart Watches
          </p>
        </div>
        <div
          className="flex flex-col justify-center items-center w-fit gap-2  cursor-pointer object-scale-down group-hover:scale-110 transition-all duration-500 ease-in-out"
          onClick={() => {
            navigate(`/products?category=tv&audio`);
          }}
        >
          <div className="bg-white/30 w-fit rounded-full p-5">
            <img
              src="/images/pngwing.com (10).png"
              alt=""
              className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] object-cover object-center "
            />
          </div>
          <p className="share-tech-regular text-slate-500 text-xl">
            Tv & audio
          </p>
        </div>
        <div
          className="flex flex-col justify-center items-center w-fit gap-2  cursor-pointer"
          onClick={() => {
            navigate(`/products?category=cameras`);
          }}
        >
          <div className="bg-white/30 w-fit rounded-full p-5">
            <img
              src="/images/pngwing.com (11).png"
              alt=""
              className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] object-cover object-center "
            />
          </div>
          <p className="share-tech-regular text-slate-500 text-xl">Cameras</p>
        </div>
      </div>

      {/* Jul 9- 10 deals 30% off don't miss out */}
      <div className=" w-[85%] lg:w-[70%] h-[28rem] m-20 mx-auto flex flex-col-reverse lg:flex-row  justify-between bg-slate-800 p-10 mt-20 rounded-xl gap-5 ">
        <div className=" flex flex-col justify-center items-center lg:items-start gap-5 ">
          <p className="text-slate-400">July 9-10</p>
          <p className="font-bold  text-3xl sm:text-4xl text-center lg:text-left">
            Shop Laptops Now <br /> (30% Off!)
          </p>
          <Link
            className="bg-slate-900 px-7 py-2 rounded-lg w-fit"
            to="/products?category=computers"
          >
            SHOP
          </Link>
        </div>
        <div className="md:hiden xl:block flex items-center justify-center">
          <img
            src="/images/pngwing.com (5).png"
            alt=""
            className="md:w-[300px] lg:w-[500px] lg:h-[500px] object-cover object-center "
          />
        </div>
      </div>
      {/* {product list } */}
      <div className="my-20 pb-20">
        <p className="text-3xl share-tech-regular pl-10 pb-10  pt-[8rem] text-slate-500 text-center">
          Explore Latest Products
        </p>
        <div className="cards w-[90%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-0 lg:px-16 md:gap-0 p-10 place-items-center sm:gap-x-10 gap-20 mt-10 pattern ">
          {products &&
            products.slice(0, 12).map((product, index) => {
              return <ProductCard data={product} key={index} />;
            })}
        </div>
      </div>
      <div className="w-[85%] md:w-[70%] h-fit m-20 mx-auto flex md:flex-row flex-col  justify-evenly items-center bg-slate-900 p-10 mt-20 rounded-xl gap-5">
        <div className="md:w-1/2">
          <img
            src="images/pngwing.com (7).png"
            className="w-full  lg:w-[400px] lg:h-[200px]"
          />
        </div>
        <div className=" flex flex-col justify-center gap-5">
          <p className="font-bold text-lg md:text-3xl share-tech-regular text-center md:text-left">
            Your Mobile. <br className="hidden md:block" />
            Your Way. <br className="hidden md:block" />
            Explore Endless Possibilities.
          </p>
        </div>
      </div>
      {/* //shop by category */}

      {/* BestSellers */}
      <div className="py-20">
        <div className="flex justify-between items-center">
          <p className="text-4xl share-tech-regular pl-10 pb-10  pt-2 text-slate-500 text-left">
            Best Sellers
          </p>
          <p className="pr-10 text-slate-400 underline cursor-pointer">
            See All
          </p>
        </div>
        <Splide hasTrack={false} aria-label="..." options={splideOptions1}>
          <SplideTrack>
            {products &&
              products.map((product, index) => {
                return (
                  <SplideSlide key={index}>
                    <div className="flex items-center justify-center">
                      <ProductCard data={product} />
                    </div>
                  </SplideSlide>
                );
              })}
          </SplideTrack>

          <div className="splide__progress mt-10">
            <div className="splide__progress__bar" />
          </div>
        </Splide>
      </div>
      {/* Discount code */}
      <div className="w-[95%] md:w-[80%] h-10 m-20 mx-auto flex flex-row justify-evenly items-center my-20 bg-slate-800 p-10 mt-20 rounded-xl gap-5 discount">
        <img
          src="/images/pngwing.com (16).png"
          alt=""
          className="w-[120px] md:w-[200px] md:h-[200px]"
        />
        <p className="font-bold text-sm md:text-xl share-tech-regular">
          Purchase any combination of 10 products and receive a discount code at
          checkout!
        </p>
      </div>

      {/* <div>
        {cart &&
          cart.map((i, index) => {
            return (
              <div key={index}>
                {i.productName}
                {i.qty}
                {i.price}
                <button onClick={() => handleRemoveFromCart(i)}>remove</button>
              </div>
            );
          })}
      </div>
      <div>
        {wishlist &&
          wishlist.map((i, index) => {
            return (
              <div key={index}>
                {i.productName}
                {i.qty}
                {i.price}
              </div>
            );
          })}
      </div> */}
      <Footer />
    </div>
  );
}

export default HomePage;
