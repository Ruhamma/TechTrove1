import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SearchBar() {
  const { products } = useSelector((state) => state.products);
    
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
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
    </div>
  );
}

export default SearchBar
