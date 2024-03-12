import React from 'react'

function ProductCard({data}) {
  const handleCart=()=>{

  }
  const handleWishlist=()=>{

  }
  return (
    <div>
      <p>{data.productName}</p>
      <p>{data.price}</p>
      <button onClick={handleCart}>cart</button>
      <button onClick={handleWishlist}>wishlist</button>
    </div>
  );
}

export default ProductCard
