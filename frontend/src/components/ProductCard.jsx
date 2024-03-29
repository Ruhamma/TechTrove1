import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { addToCart } from "../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { Link } from "react-router-dom";

function ProductCard({ data }) {
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);

  const d = data.productName;
  const product_name = d && d.replace(/\s+/g, "-");
  const dispatch = useDispatch();
  const handleCart = () => {
    const cartData = { ...data };
    dispatch(addToCart(cartData));
  };
  const handleWishlistAddition = () => {
    setClick(!click);

    dispatch(addToWishlist(data));
  };
  const handleWishlistRemoval = () => {
    dispatch(removeFromWishlist(data));

    setClick(!click);
  };

  return (
    <div className="flex text-white rounded-lg border-2 border-black/20  bg-slate-00  mt-10  w-[155px] h-[210px] sm:w-[175px] sm:h-[240px] md:w-[205px] md:h-[270px] flex-col shadow-md">
      <div className=" relative overflow-hidden h-[180px] w-full mb-[10px] rounded-lg group ">
        <Link to={`/product/${product_name}`}>
          {data && data.images[0].url ? (
            <img
              src={data.images[0].url}
              alt="item"
              className="object-center w-full h-full object-scale-down rounded-lg group-hover:scale-110 transition-all duration-500 ease-in-out"
            />
          ) : null}
        </Link>
      </div>
      <div className="flex gap-2 p-2 flex-col bg-black/30">
        <Link
          to={`/product/${product_name}`}
          className="text-lg font-semibold share-tech-regular"
        >
          <p>{data.productName}</p>
        </Link>
        <p className="text-gray-600">{data.discountPrice} $</p>
        <div className="flex items-center justify-between item-center ">
          <button onClick={handleCart}>
            <AiOutlineShoppingCart
              size={25}
              title="Add to cart"
              className="cursor-pointer rounded-md"
            />
          </button>
          {click ? (
            <AiFillHeart
              size={20}
              onClick={handleWishlistRemoval}
              title="remove from wishlist"
              color={click ? "red" : "#333"}
              className="cursor-pointer"
            />
          ) : (
            <AiFillHeart
              size={20}
              onClick={handleWishlistAddition}
              title="Add to wishlist"
              color={click ? "red" : "#333"}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
