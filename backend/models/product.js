const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name missing"],
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity missing"],
  },
  category: [
    {
      name: {
        type: String,
        required: true,
        index: true,
      },
    },
  ],

  price: {
    type: Number,
    required: [true, "Product price missing"],
  },

  discountPrice: {
    type: Number,
    validate: {
      validator: function (value) {
        return value <= this.price;
      },
      message: "Discount price must be less than or equal to original price",
    },
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  reviews: [
    {
      userId: {
        type: String,
      },
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
