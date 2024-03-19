import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Nav from "../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ProductCard from "../components/ProductCard";
import { AiOutlineMessage } from "react-icons/ai";
import Collapsible from "react-collapsible";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";
import { addToWishlist } from "../redux/actions/wishlist";

function ProductDetailsPage() {
  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const [product, setProduct] = useState();
  const [suggestions, setSuggestion] = useState([]);
  const [select, setSelect] = useState(0);
  const [value, setValue] = useState(1);
  const { name } = useParams();
  const productName = name.replace(/-/g, " ");
  useEffect(() => {
    const data =
      products &&
      products.find((product) => product.productName === productName);
    setProduct(data);
  }, [products, productName]);
  useEffect(() => {
    const data =
      product &&
      products &&
      products.filter((item) => item.category === product.category);
    setSuggestion(data);
  }, [products, product]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = (id) => {
    dispatch(addToCart(id));
  };
  const addToWishlistHandler = (data) => {
    dispatch(addToWishlist(data));
  };
  const splideOptions = {
    type: "loop",
    perPage: 4,
    perMove: 1,
    autoplay: true,
    arrows: false,
    interval: 3000,
    breakpoints: {
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    },
  };
  return (
    <div>
      <Nav />
      <SearchBar />
      {product ? (
        <div className="md:p-10">
          <div className="flex md:flex-row flex-col">
            <div className=" mt-20 md:mt-0 mx-auto md:mx-0 flex items-center justify-evenly container w-full  md:w-3/4">
              <div className="w-fit gap-2  grid grid-cols-1 justify-center items-center">
                <div
                  className={`${
                    select === 0 ? "border-2 border-slate-500 " : "null"
                  } cursor-pointer flex justify-center border-2 w-28 h-32 sm:w-32 sm:h-36 rounded-xl`}
                >
                  <img
                    src={product?.images[0]?.url}
                    alt=""
                    onClick={() => setSelect(0)}
                    className="w-fit rounded-xl"
                  />
                </div>
                <div
                  className={`${
                    select === 1 ? "border-2 border-slate-500" : "null"
                  } cursor-pointer flex justify-center border-2 w-28 h-32 sm:w-32 sm:h-36 rounded-xl`}
                  onClick={() => setSelect(1)}
                >
                  <img
                    src={product?.images[1]?.url}
                    alt=""
                    className="w-fit rounded-xl"
                    onClick={() => setSelect(1)}
                  />
                </div>
                <div
                  className={`${
                    select === 2 ? "border-2 border-slate-500" : "null"
                  } cursor-pointer flex justify-center border-2 w-28 h-32 sm:w-32 sm:h-36 rounded-xl`}
                >
                  <img
                    src={product?.images[2]?.url}
                    alt=""
                    className="w-fit rounded-xl"
                    onClick={() => setSelect(2)}
                  />
                </div>
                <div
                  className={`${
                    select === 3 ? "border-2 border-slate-500" : "null"
                  } cursor-pointer flex justify-center border-2  w-28 h-32 sm:w-32 sm:h-36 rounded-xl`}
                >
                  <img
                    src={product?.images[3]?.url}
                    alt=""
                    className="w-fit rounded-xl"
                    onClick={() => setSelect(3)}
                  />
                </div>
              </div>
              <img
                src={product.images[select].url}
                alt=""
                className="w-[55%] sm:w-[60%] h-[500px] rounded-lg"
              />
            </div>
            <div className="mx-auto md:mx-0 pt-5 px-5 md:px-0 container w-full md:w-2/4">
              <div className="w-full flex flex-col gap-6">
                <h1 className="font-bold text-3xl pt-10">
                  {product.productName}
                </h1>

                <div>
                  <p className="text-xl pb-2 text-gray-400">
                    {product.category}
                  </p>
                  <div className="flex  gap-4 items-center">
                    <p className="text-2xl">{product.rating} </p>
                    {/* <Ratings value={product.rating} /> */}
                  </div>
                </div>

                <div className="">
                  <p className="font-bold text-2xl">
                    {" "}
                    {product.discountPrice} ETB
                  </p>
                  <p className="font-bold text-xl line-through pr-2 pl-1 text-gray-500">
                    {" "}
                    {product.price}
                  </p>
                </div>
                <div className=" w-11/12 py-4">
                  <span className="font-bold mb-3">Description</span>

                  <div className="">{product.description}</div>
                </div>
                <div className="flex flex-col justify-center  items-center gap-2">
                  <div
                    className={`cursor-pointer bg-slate-500/20 w-full rounded-2xl px-10 py-2`}
                    onClick={() => {
                      addToCartHandler(product._id);
                    }}
                  >
                    <h1 className="text-white text-xl text-center font-[600]">
                      Add to cart
                    </h1>
                  </div>
                  <div
                    className={`cursor-pointer bg-slate-500/40 w-full rounded-2xl px-10 py-2`}
                    onClick={() => {
                      addToWishlistHandler(product._id);
                    }}
                  >
                    <h1 className="text-white text-xl text-center font-[600]">
                      Add to Wishlist
                    </h1>
                  </div>
                  <div
                    className={`cursor-pointer bg-slate-500 w-full rounded-2xl px-10 py-2`}
                  >
                    <h1 className="text-white text-xl text-center font-[600]">
                      Buy
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <p className="p-10 share-tech-regular text-xl sm:text-2xl ">
            You May Also Like
          </p>
          <Splide options={splideOptions}>
            <div className="flex overflow-hidden gap-10 px-10">
              {products &&
                products.map((product, index) => {
                  return (
                    <div className="">
                      <SplideSlide>
                        <ProductCard data={product} key={index} />
                      </SplideSlide>
                    </div>
                  );
                })}
            </div>
          </Splide>
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetailsPage;
