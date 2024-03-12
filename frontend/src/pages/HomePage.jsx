import React from "react";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/actions/cart.js";
function HomePage() {
  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };
  return (
    <div>
      <Nav />
      Home page
      <Link to="/create-product">Create</Link>
      {products &&
        products.map((product, index) => {
          return (
            <div>
              <ProductCard data={product} key={index} />
            </div>
          );
        })}
      <div>
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
      </div>
    </div>
  );
}

export default HomePage;
