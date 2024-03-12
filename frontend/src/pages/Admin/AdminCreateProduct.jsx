import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../../redux/actions/product";
import { server } from "../../server";
import axios from "axios";
function AdminCreateProduct() {
  const { success, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(`${server}/product/adminGetProducts`, { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
      });
  }, [success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.set("images", image);
    });
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
        images,
      })
    );
    setPrice("");
    setProductName("");
    setDescription("");
    setDiscountPrice("");
    setImages([]);
  };
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
  };
  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product name..."
          required
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          name="description"
          value={description}
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
        <label>Upload Images:</label>
        <input
          type="file"
          name=""
          id="upload"
          multiple
          onChange={handleImageChange}
        />
        {images && images.map((i) => <img src={i} key={i} alt="" />)}
        <input type="submit" value="Create" />
      </form>
      All products
      {products &&
        products.map((product) => {
          return (
            <div>
              <p>{product.productName}</p>
              <p>{product.price}</p>
              <button onClick={() => handleDelete(product._id)}>delete</button>
            </div>
          );
        })}
    </div>
  );
}

export default AdminCreateProduct;
