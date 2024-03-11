import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";
function HomePage() {
  const { products } = useSelector((state) => state.products);
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
    </div>
  );
}

export default HomePage;
