import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProductAdmin,
} from "../../redux/actions/product";
import { server } from "../../server";
import axios from "axios";
const initialState = {
  id: "",
  productName: "",
  description: "",
  price: "",
  discountPrice: "",
};
function AdminCreateProduct() {
  const { success, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editProductValues, setEditProductValues] = useState(initialState);
  const [editImages, setEditImages] = useState([]);

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
    dispatch(deleteProduct(id));
  };
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditProductValues({
      id: product._id,
      productName: product.productName,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice,
    });
    setEditImages(product.images);
  };
  const handleImageEdit=(e)=>{
   const files = Array.from(e.target.files);
   const filePromises = files.map((file) => {
     return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.onload = (e) => resolve(e.target.result);
       reader.onerror = (error) => reject(error);
       reader.readAsDataURL(file);
     });
   });

   Promise.all(filePromises)
     .then((results) => {
       setEditImages(results);
     })
     .catch((error) => console.log(error));
  }
  const handleSaveEdit = () => {
    dispatch(
      editProductAdmin(
        editProductValues.id,
        editProductValues.productName,
        editProductValues.description,
        editProductValues.price,
        editProductValues.discountPrice,
        editImages
      )
    );

    // setEditProduct(null);
  };
  const handleCancelEdit = () => {
    setEditProduct(null);
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
        products.map((product, index) => {
          return (
            <div key={index}>
              <p>name</p>
              {editProduct === product ? (
                <input
                  type="text"
                  value={editProductValues.productName}
                  onChange={(e) =>
                    setEditProductValues({
                      ...editProductValues,
                      productName: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{product.productName}</p>
              )}
              <p>description</p>
              {editProduct === product ? (
                <input
                  type="text"
                  value={editProductValues.description}
                  onChange={(e) =>
                    setEditProductValues({
                      ...editProductValues,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{product.description}</p>
              )}
              <p>price</p>
              {editProduct === product ? (
                <input
                  type="number"
                  value={editProductValues.price}
                  onChange={(e) =>
                    setEditProductValues({
                      ...editProductValues,
                      price: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{product.price}</p>
              )}
              <p>discount price</p>
              {editProduct === product ? (
                <input
                  type="number"
                  value={editProductValues.discountPrice}
                  onChange={(e) =>
                    setEditProductValues({
                      ...editProductValues,
                      discountPrice: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{product.discountPrice}</p>
              )}

              <p>images</p>
              {product.images.map((i) => (
                <img src={i.url} key={i.url} alt="" />
              ))}
              <input
                type="file"
                name=""
                id="upload"
                multiple
                onChange={(e) => handleImageEdit(e)}
              />
              <button onClick={() => handleDelete(product._id)}>delete</button>
              {editProduct === product ? (
                <div>
                  <button onClick={() => handleSaveEdit}>Save</button>
                  <button onClick={() => handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => handleEdit(product)}>edit</button>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default AdminCreateProduct;
