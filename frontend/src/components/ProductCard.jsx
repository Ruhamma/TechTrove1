import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";

function ProductCard({ data }) {
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const handleCart = () => {
    const cartData = { ...data, qty: 1 };
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
    <div>
      <p>{data.productName}</p>
      <p>{data.price}</p>

      <button onClick={handleCart}>cart</button>
      {click ? (
        <button onClick={handleWishlistRemoval}>remove from wishlist</button>
      ) : (
        <button onClick={handleWishlistAddition}>wishlist</button>
      )}
    </div>
  );
}

export default ProductCard;
