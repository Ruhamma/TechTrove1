import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions/cart";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function CartPage() {
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };
  const [quantities, setQuantities] = useState(cart.map(() => 1));

  const increment = (index) => {
    const newQuantities = [...quantities];
    const newQuantity = newQuantities[index] + 1;

    const item = cart[index];

    if (newQuantity > item.qty) {
      // Show toast indicating quantity cannot exceed stock
      toast.error(`Only ${item.qty} units of ${item.productName} is available`);
    } else {
      newQuantities[index] += 1;
      setQuantities(newQuantities);
    }
  };

  const decrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    } else {
      // Toast a message indicating that the quantity cannot be lower than 1
      toast.error("Product can't be less than zero");
    }
  };

  const calculateTotalCartPrice = () => {
    let total = 0;
    cart.forEach((item, index) => {
      const quantity = quantities[index];
      total += item.discountPrice * quantity;
    });
    return total;
  };
  const suggestProducts = (products, wishlist) => {
    const uniqueCategories = Array.from(
      new Set(wishlist.map((item) => item.category))
    );
    const randomize = () => Math.random() - 0.5;
    const filteredProducts = products
      .filter((product) => uniqueCategories.includes(product.category))
      .sort(randomize);

    return filteredProducts.slice(0, 6);
  };

  useEffect(() => {
    const generateRandomSuggestions = () => {
      const suggestions = suggestProducts(products, cart);
      setSuggestedProducts(suggestions);
    };

    generateRandomSuggestions();
  }, [products, cart]);
  const handleCheckout = () => {
    const cartData = JSON.stringify({ cart, quantities });
    localStorage.setItem("cartData", cartData);
    navigate("/checkout");
  };

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
    <div>
      <Nav />
      <SearchBar />
      <h1 className="mt-20 text-3xl md:text-4xl text-center share-tech-regular p-2 m-2 pl-4 ">
        Shopping Cart
      </h1>
      <div className="flex flex-col md:flex-row mt-20">
        <div className="md:w-[65%] flex flex-col gap-10 p-5 md:px-10">
          {cart &&
            cart.map((i, index) => {
              const quantity = quantities[index];
              return (
                <div
                  key={index}
                  className="bg-slate-700/30 flex items-center justify-between rounded-lg px-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <img
                      src={i.images[0].url}
                      alt="picture"
                      className="w-[80px] h-[130px] md:w-[106px] md:h-[186px] object-cover object-center"
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
                      <p>{i.qty} in stock</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-lg pb-2 hidden md:block">
                    <span className="line-through pr-2 pl-1 text-gray-500">
                      $ {i.price}
                    </span>
                    <br />$ {i.discountPrice}
                  </p>
                  <div className="flex flex-col items-center justify-evenly h-full ">
                    <div className="addMinus flex items-center gap-4">
                      <div
                        className="border-black border-2 rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => increment(index)}
                      >
                        <HiPlus size={18} />
                      </div>
                      <span className="text-sm md:text-base">{quantity}</span>
                      <div
                        className="border-gray-800 border-2 rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => decrement(index)}
                      >
                        <HiOutlineMinus size={16} />
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(i)}
                      className="text-base lg:text-xl underline font-light w-fit"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="md:w-[35%]  p-5 ">
          {" "}
          <div className="bg-slate-900/30 text-slate-200 md:mr-10 p-4">
            <p className="text-2xl pb-6">Items ({cart.length})</p>
            {cart &&
              cart.map((i, index) => {
                const quantity = quantities[index];
                return (
                  <div
                    key={index}
                    className="flex justify-between border-b-2 pb-4 pt-2"
                  >
                    <p>
                      {i.productName} x {quantity}
                    </p>
                    <p>$ {i.discountPrice * quantity}</p>
                  </div>
                );
              })}
            <div className="flex justify-between w-full text-2xl bg-slate-] py-4">
              <p className="">TotalPrice:</p>
              <p>$ {calculateTotalCartPrice()}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-slate-500/50 hover:bg-slate-800 w-full p-2 mt-4 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <p className="share-tech-regular text-2xl sm:text-3xl p-4 pt-16 pl-10">
        Products you might like
      </p>

      <Splide hasTrack={false} aria-label="..." options={splideOptions1}>
        <SplideTrack>
          {suggestedProducts &&
            suggestedProducts.map((product, index) => {
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
      <Footer />
    </div>
  );
}

export default CartPage;
