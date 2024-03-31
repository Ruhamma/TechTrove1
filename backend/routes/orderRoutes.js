const express = require("express");
const catchError = require("../middleware/catchError");
const ErrorHandler = require("../utils/ErrorHandler");
const Order = require("../models/order");
const Stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const paypal = require("@paypal/checkout-server-sdk");

//PayPal Payments SDK client ID and secret
console.log(process.env.PAYPAL_CLIENT_ID);
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const orderRouter = express.Router();

orderRouter.post(
  "/create-order",
  catchError(async (req, res, next) => {
    try {
      const { cartData, totalPrice, userId, address } = req.body;
      console.log(cartData);
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
      currency: "USD",
      product_data: {
        name: item.productName,
        images: [item.images[0].url],
      },
      unit_amount: item.discountPrice * 100,
    },
    quantity: cartData.quantities[index],
  }));
  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/order-success`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  });

  res.json({ sessionId: session.id });
});

orderRouter.post("/create-paypal-order", async (req, res) => {
  try {
    const { cartData, totalPrice, userId, address } = req.body;

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
    const order1 = new Order({
      cart: cartData,
      totalPrice,
      userId,
      address,
    });
    await order1.save();
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

orderRouter.get(
  "/getUserOrder/:id",
  catchError(async (req, res, next) => {
    try {
      const order = await Order.find({ userId: req.params.id }).populate(
        "cart.cart"
      );

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user orders" });
    }
  })
);
module.exports = orderRouter;
