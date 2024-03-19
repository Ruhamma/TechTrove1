const express = require("express");
const catchError = require("../middleware/catchError");
const ErrorHandler = require("../utils/ErrorHandler");
const Order = require("../models/order");
const Stripe = require("stripe")(
  "sk_test_51Ov3Mg2MaqK23wHIS2eTJiyHPSxxeWyXBY9UfgnY0Kt1lNd8svdHBwpkAeMMU8DYx5ESR0Bv3v13lh7B4YaRVfEp00UE40KgEb"
);
const paypal = require("@paypal/checkout-server-sdk");

//PayPal Payments SDK client ID and secret
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_SECRET;
const environment = new paypal.core.SandboxEnvironment(
  "AaKr2aN-CZLfLue_0LUIeYPckKmTCxu2JBZypcacxlF1dS3On9SPAOWDXdiR3sgWs7ktfZLvm3eCMbU6",
  "EJ_6TMNTNhgQ0YW7CTpu04dkptAHpi82y3qU9OiWqYMsr2Dzb94pyN5AEH8zJ16wX8nCZgCSHrNyl4o1"
);
const client = new paypal.core.PayPalHttpClient(environment);

const orderRouter = express.Router();

orderRouter.post(
  "/create-order",
  catchError(async (req, res, next) => {
    try {
      const { cartData, totalPrice, userId, address } = req.body;
      const existingOrder = await Order.findOne({ userId });

      if (existingOrder) {
        throw new ErrorHandler("Order already exists for this user", 400);
      }
      const order = new Order({
        cart: cartData,
        totalPrice,
        userId,
        address,
      });
      await order.save();
      if (!order._id) throw new ErrorHandler("Product not created", 400);
      if (order._id) {
        console.log("Order Created");
      }
      res
        .status(201)
        .json({ success: true, data: order, message: "Order Created" });
    } catch (err) {
      next(new ErrorHandler(err.message, 400));
    }
  })
);

orderRouter.post("/create-checkout-session", async (req, res) => {
  const { cartData, totalPrice, userId, address, currency } = req.body;
  const YOUR_DOMAIN = "http://localhost:3000";

  const lineItems = cartData.cart.map((item, index) => ({
    price_data: {
      currency: "USD", // Replace with your desired currency
      product_data: {
        name: item.productName,
        images: [item.images[0].url], // Replace with your product image
        // Add other product details as needed
      },
      unit_amount: item.discountPrice * 100, // Stripe requires the price in cents
    },
    quantity: cartData.quantities[index],
  }));
  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/order-success`,
    cancel_url: `${YOUR_DOMAIN}/order-failed`,
  });

  // Send published serialized session object to client for checkout
  res.json({ sessionId: session.id });
});

orderRouter.post("/create-paypal-order", async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.body.totalPrice,
          },
        },
      ],
    });

    const response = await client.execute(request);
    const order = response.result;
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});
module.exports = orderRouter;
