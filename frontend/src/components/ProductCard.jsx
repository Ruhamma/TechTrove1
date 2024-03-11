import React from 'react'

function ProductCard({data}) {
  return (
    <div>
      <p>{data.productName}</p>
      <p>{data.price}</p>
    </div>
  );
}

export default ProductCard
