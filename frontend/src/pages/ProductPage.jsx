import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Collapsible from "react-collapsible";
import { FaFilter } from "react-icons/fa";
import Footer from "../components/Footer";

function ProductPage() {
  const { products } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [selectedSort, setSelectedSort] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [openFilter, setOpenFilter] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryData = searchParams.get("category");
  const categoryName = categoryData.toLowerCase();
  console.log(categoryName);
  useEffect(() => {
    const filteredData =
      products &&
      products.filter((product) => product.category === categoryName);
    if (filteredData && filteredData.length === 0) {
      console.log("No product found");
    }
    setData(filteredData);
    setIsLoading(false); // Set loading state to false after data is fetched
  }, [categoryData, categoryName, products]);

  const handleSortChange = (option) => {
    setSelectedSort(option);
    let sortedData = [...data];

    switch (option) {
      case "latest":
        sortedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "oldest":
        sortedData.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "lowToHigh":
        sortedData.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "highToLow":
        sortedData.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      default:
        break;
    }

    setData(sortedData);
  };

  const handlePriceRangeChange = () => {
    let filteredData = [...products];

    if (minPrice && maxPrice) {
      filteredData = filteredData.filter(
        (product) =>
          product.discountPrice >= minPrice && product.discountPrice <= maxPrice
      );
    } else if (minPrice) {
      filteredData = filteredData.filter(
        (product) => product.discountPrice >= minPrice
      );
    } else if (maxPrice) {
      filteredData = filteredData.filter(
        (product) => product.price <= maxPrice
      );
    }

    setData(filteredData);
  };

  console.log(data.length, "data");
  if (isLoading) {
    return <p>Loading ......</p>;
  }

  return (
    <div>
      <Nav />
      <SearchBar />
      <div className="w-[90%] h-[30vh] bg-slate-400 mx-auto rounded-lg p-10 mt-5 relative shadow-sm shadow-white/50">
        <p className="text-3xl z-30 absolute">
          {" "}
          Welcome to the world of <br /> {categoryName}
        </p>
        {/* here add images by checking the category and displaying relevant ones */}
        {categoryName === "computers" ? (
          <img
            src="/images/computers.jpg"
            alt="computers"
            className="w-full h-full absolute top-0 right-0 bg-red-800/20 z-20 object-center object-cover"
          />
        ) : categoryName === "phones" ? (
          <img
            src="/images/phones.jpg"
            alt="phones"
            className="w-full h-full absolute top-0 right-0 bg-red-800/20 z-20 object-top object-cover"
          />
        ) : categoryName === "tablets" ? (
          <img
            src="/images/tablets.jpg"
            alt="tablets"
            className="w-full h-full absolute top-0 right-0 bg-red-800/20 z-20 object-center object-cover"
          />
        ) : categoryName === "cameras" ? (
          <img
            src="/images/cameras.jpg"
            alt="cameras"
            className="w-full h-full absolute top-0 right-0 bg-red-800/20 z-20 object-center object-cover"
          />
        ) : categoryName === "tv" ? (
          <img
            src="/images/tv.jpg"
            alt="tv"
            className="w-full h-full absolute top-0 right-0 bg-red-800/20 z-20 object-center object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-col md:flex-row gap-5 p-2  ">
        <div className="md:block hidden">
          {/* product filter */}
          <div className="flex flex-col gap-5 p-10 pl-5 mt-10 bg-slate-900/30">
            <h1 className="text-2xl font-semibold">Filter by</h1>
            <div className="flex flex-col gap-2">
              <p>Date</p>
              <label className="flex items-center gap-2 pl-5">
                <input
                  type="checkbox"
                  checked={selectedSort === "latest"}
                  onChange={() => handleSortChange("latest")}
                />
                Latest
              </label>
              <label className="flex items-center gap-2 pl-5">
                <input
                  type="checkbox"
                  checked={selectedSort === "oldest"}
                  onChange={() => handleSortChange("oldest")}
                />
                Oldest
              </label>
              <p>Price</p>
              <label className="flex items-center gap-2 pl-5">
                <input
                  type="checkbox"
                  checked={selectedSort === "lowToHigh"}
                  onChange={() => handleSortChange("lowToHigh")}
                />
                Low to High
              </label>
              <label className="flex items-center gap-2 pl-5">
                <input
                  type="checkbox"
                  checked={selectedSort === "highToLow"}
                  onChange={() => handleSortChange("highToLow")}
                />
                High to Low
              </label>
              <p>Price Range</p>
              <input
                type="text"
                placeholder="Enter min price range"
                onChange={(e) => setMinPrice(e.target.value)}
                inputMode="numeric"
                className="text-black my-1 rounded-md border-2 border-slate-500 p-1"
              />
              <input
                type="text"
                placeholder="Enter max price range"
                onChange={(e) => setMaxPrice(e.target.value)}
                inputMode="numeric"
                className="text-black my-1 rounded-md border-2 border-slate-500 p-1"
              />
              <button
                onClick={handlePriceRangeChange}
                className="bg-slate-500/10 py-2 px-5 rounded-lg"
              >
                Apply Price Range
              </button>
              <p> Rating</p>
              {/* Rating options */}
            </div>
          </div>
        </div>
        <div
          onClick={() => setOpenFilter(!openFilter)}
          className="block md:hidden "
        >
          <Collapsible
            triggerStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            trigger={
              <div className="flex items-center justify-center gap-1 bg-slate-500 py-1 px-2 mt-10 ml-5 rounded-lg">
                {!openFilter ? <FaFilter className="  " /> : <FaFilter />}
                <span className="font-bold ">Filter</span>
              </div>
            }
            triggerClassName="collapsible-trigger"
          >
            <div className="flex flex-col gap-5 p-10 pl-5 mt-10 bg-slate-900/30">
              <h1 className="text-2xl font-semibold">Filter by</h1>
              <div className="flex flex-col gap-2">
                <p>Date</p>
                <label className="flex items-center gap-2 pl-5">
                  <input
                    type="checkbox"
                    checked={selectedSort === "latest"}
                    onChange={() => handleSortChange("latest")}
                  />
                  Latest
                </label>
                <label className="flex items-center gap-2 pl-5">
                  <input
                    type="checkbox"
                    checked={selectedSort === "oldest"}
                    onChange={() => handleSortChange("oldest")}
                  />
                  Oldest
                </label>
                <p>Price</p>
                <label className="flex items-center gap-2 pl-5">
                  <input
                    type="checkbox"
                    checked={selectedSort === "lowToHigh"}
                    onChange={() => handleSortChange("lowToHigh")}
                  />
                  Low to High
                </label>
                <label className="flex items-center gap-2 pl-5">
                  <input
                    type="checkbox"
                    checked={selectedSort === "highToLow"}
                    onChange={() => handleSortChange("highToLow")}
                  />
                  High to Low
                </label>
                <p>Price Range</p>
                <input
                  type="text"
                  placeholder="Enter min price range"
                  onChange={(e) => setMinPrice(e.target.value)}
                  inputMode="numeric"
                  className="text-black my-1 rounded-md border-2 border-slate-500 p-1"
                />
                <input
                  type="text"
                  placeholder="Enter max price range"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  inputMode="numeric"
                  className="text-black my-1 rounded-md border-2 border-slate-500 p-1"
                />
                <button
                  onClick={handlePriceRangeChange}
                  className="bg-slate-500/10 py-2 px-5 rounded-lg"
                >
                  Apply Price Range
                </button>
                <p> Rating</p>
                {/* Rating options */}
              </div>
            </div>
          </Collapsible>
        </div>
        {data.length === 0 ? (
          <div className=" w-full flex flex-col items-center">
            <p className="text-4xl share-tech-regular mx-auto font-bold w-fit mt-10">No Item Yet</p>
            <img
              src="/images/NoItem.svg"
              alt="empty"
              className="w-1/2 mx-auto"
            />
          </div>
        ) : (
          <div className=" w-full">
            <div className="cards grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  p-10 place-items-center sm:gap-x-10 gap-20 md:mt-10 ">
              {data &&
                data.map((product, index) => (
                  <div key={index} className="">
                    <ProductCard data={product} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
