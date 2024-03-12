const express = require("express");
const Product = require("../models/product");
const catchError = require("../middleware/catchError");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const productRouter = express.Router();
const cloudinary=require("cloudinary")
//Get all products for user
productRouter.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Add products
productRouter.post(
  "/adminAddProduct",
  isAuthenticated,
  isAdmin,
  catchError(async (req, res, next) => {
    try {
        let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const productData = req.body;
      productData.images = imagesLinks;

      const product = await Product.create(productData);
      if (!product._id) throw new ErrorHandler("Product not created", 400);
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      next(new ErrorHandler(err.message, 400));
    }
  })
  //     res.status(201).json({
  //       success: true,
  //       product,
  //     });
  //   } catch (error) {}
  // })
);

//get products for admin

productRouter.get(
  "/adminGetProducts",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

//delete product

productRouter.delete(
  "/adminDeleteProduct/:id",
  isAuthenticated,
  isAdmin,
  catchError(async (req, res, next) => {
    try {
      const product = await Product.findOneAndDelete({ _id: req.params.id });
      if (!product) {
        return next(new ErrorHandler("No product found", 404));
      }

      for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          product.images[i].public_id
        );
      }

      res.status(201).json({
        success: true,
        message: "Product removed !",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = productRouter;
