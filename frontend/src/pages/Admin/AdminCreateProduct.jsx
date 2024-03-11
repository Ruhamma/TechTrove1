import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/product";
function AdminCreateProduct() {
  const { success, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  // useEffect(() => {
  //   if (error) {
  //     //  toast.error(error);
  //   }
  //   if (success) {
  //     console.log("Product created successfully!");
  //     window.location.reload();
  //   }
  // }, [dispatch,error, success]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    newForm.append("productName", productName);
    newForm.append("description", description);
    newForm.append("price", price);
    newForm.append("discountPrice", discountPrice);
    dispatch(
      addProduct({
        productName,
        description,
        price,
        discountPrice,
      })
    );
    setPrice("");
    setProductName("");
    setDescription("");
    setDiscountPrice("");
  
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product name..."
          required
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description..."
          required
        />
        <label>Original Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter your product price..."
        />
        <label>Discount Price</label>
        <input
          type="number"
          name="price"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          placeholder="Enter your product price with discount..."
          required
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default AdminCreateProduct;
