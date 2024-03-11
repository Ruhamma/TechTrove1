const express = require("express");
const Product = require("../models/product");
const catchError = require("../middleware/catchError");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const productRouter = express.Router();

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
  "/adminAddProduct",isAuthenticated,
  isAdmin,
  catchError(async (req, res, next) => {
    try {
      const productData = req.body;
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
  "/adminDeleteProduct",
  isAuthenticated,
  isAdmin,
  catchError(async (req, res, next) => {
    try {
      const product = await Product.findOneAndDelete({ _id: req.params.id });
      if (!product) {
        return next(new ErrorHandler("No product found", 404));
      }

      //add image deletion here

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
