import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/actions/order";
import { loadStripe } from "@stripe/stripe-js";
import { server } from "../server";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { FaPaypal, FaStripeS } from "react-icons/fa";
import { IoCashSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const stripePromise = loadStripe(
  "pk_test_51Ov3Mg2MaqK23wHIrX4rdIWc5FtgjOzZoCtZVoNgA9h9ZB75BEXhSW9JhJ9mYTkxce8TkO5bHSFEiH0hk7bHwlUr00N5GWUIF2"
);
function CheckoutPage() {
  const [cartData, setCartData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const [initialTotalPrice, setInitialTotalPrice] = useState(0);
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const [show, setShow] = useState(false);
  useEffect(() => {
    const calculateTotalPrice = () => {
      if (!cartData) return;
      const { cart, quantities } = cartData;
      let totalPrice = 0;
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const quantity = quantities[i];
        totalPrice += item.discountPrice * quantity;
      }
      setInitialTotalPrice(totalPrice);
      // Applying 10% discount
      if (cart.length >= 5) {
        totalPrice *= 0.9;
        setShow(true);
      }
      setTotalPrice(totalPrice);
    };

    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      const parsedCartData = JSON.parse(storedCartData);
      setCartData(parsedCartData);
      calculateTotalPrice();
    }
  }, [cartData]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
    try {
      console.log("Placing order");
      const { cart, quantities } = cartData;
      const orderData = {
        cartData: {
          cart,
          quantities,
        },
        totalPrice,
        userId: user._id,
        address: selectedAddress,
      };
      const response = await dispatch(addOrder(orderData));
      if (!response.success) {
        toast.error(response.error);
        return;
      }
      localStorage.removeItem("cartData");
      localStorage.removeItem("cartItems");
      navigate("/order-success");
      window.location.reload();
    } catch (err) {
      toast.error("Order not placed try again");
    }
  };
  const handleGoToPayment = async () => {
   try {
     const stripe = await stripePromise;

     // Create a Checkout Session on the backend
     const response = await fetch(`${server}/order/create-checkout-session`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         cartData: {
           cart,
           quantities,
         },
         totalPrice: totalPrice,
         userId: user._id,
         address: selectedAddress,
         currency: "$", // Or your preferred currency
       }),
     });

     if (!response.ok) {
       throw new Error("Failed to create checkout session");
     }

     const sessionData = await response.json();

     // Redirect to Stripe Checkout with the session ID
     const result = await stripe.redirectToCheckout({
       sessionId: sessionData.sessionId,
      });
      console.log(result);
      
      if (result.error) {
        throw new Error(result.error.message);
      }
     
      // Payment successful, now place the order
   } catch (err) {
     toast.error("Payment failed: " + err.message);
   }
  };

  const handlePaypalPayment = async () => {
    try {
      const response = await fetch(`${server}/order/create-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartData: {
            cart,
            quantities,
          },
          totalPrice: totalPrice,
          userId: user._id,
          address: selectedAddress,
        }),
      });

      const orderData = await response.json();

      
      return orderData.orderId;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
    }
  };

  if (!cartData) {
    return <p>Loading cart data...</p>;
  }

  const { cart, quantities } = cartData;
  const handleAddressChange = (addressId) => {
    const selectedAddress = user.addresses.find(
      (address) => address._id === addressId
    );
    setSelectedAddress(selectedAddress);
    setIsAddressSelected(true);
  };

  return (
    <div className="checkout-page pattern">
      {" "}
      <Nav />
      <SearchBar />
      <h1 className="text-3xl text-center p-2 m-10 share-tech-regular">
        Order Summary
      </h1>
      <div className=" w-[90%] md:w-2/3 mx-auto flex flex-col gap-10 bg-slate-400/30 p-2 sm:p-5 md:p-10 rounded-lg ">
        <table className="w-full divide-y-2 bg-slate-900/20 border-collapse rounded-md">
          <thead>
            <tr className="text-left">
              <th>Image</th>
              <th>Product</th>
              <th className="hidden sm:table-cell">Quantity</th>
              <th className="hidden sm:table-cell">Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.productId}>
                <td>
                  <img
                    src={item.images[0].url}
                    alt={item.productName}
                    className="w-10 h-10 mb-2"
                  />
                </td>
                <td className="mb-2">{item.productName}</td>
                <td className="mb-2 hidden sm:table-cell ">
                  {quantities[index]}
                </td>
                <td className="mb-2 hidden sm:table-cell ">
                  $ {item.discountPrice.toFixed(2)}
                </td>
                <td className="mb-2">
                  $ {(item.discountPrice * quantities[index]).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div>
            <h1 className="text-2xl text-white font-semibold text-center pb-4">
              Choose your Shipping Address
            </h1>
            <div className="flex flex-col md:flex-row flex-wrap justify-center mt-5 text gap-2 md:gap-10">
              {user &&
                user.addresses.map((address) => (
                  <label
                    key={address._id}
                    className="cursor-pointer bg-slate-900/20 p-2 rounded-lg hover:bg-slate-900/50"
                  >
                    <input
                      type="radio"
                      value={address._id}
                      checked={
                        selectedAddress && selectedAddress._id === address._id
                      }
                      onChange={() => handleAddressChange(address._id)}
                    />
                    {address.country},{address.city},{address.address1},{" "}
                    {address.address2}
                  </label>
                ))}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-center my-5 py-4">
              Payment Method
            </h1>
            <div className="flex flex-col md:flex-row justify-center mt-5 text gap-2 md:gap-10">
              <label className="cursor-pointer bg-slate-900/20 p-2 rounded-lg hover:bg-slate-900/50 h-fit">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <p className="inline-block  ml-2">
                  <span className="flex items-center justify-center gap-2">
                    <IoCashSharp />
                    Cash on Delivery
                  </span>
                </p>
              </label>
              <label className="cursor-pointer bg-slate-900/20 p-2 rounded-lg hover:bg-slate-900/50 h-fit">
                <input
                  type="radio"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                <p className="inline-block  ml-2">
                  <span className="flex items-center justify-center gap-2">
                    <FaStripeS />
                    Stripe
                  </span>
                </p>
              </label>
              <label className="cursor-pointer bg-slate-900/20 p-2 rounded-lg hover:bg-slate-900/50 h-fit">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                <p className="inline-block  ml-2">
                  <span className="flex items-center justify-center gap-2">
                    <FaPaypal />
                    Paypal
                  </span>
                </p>
              </label>
            </div>
          </div>
        </div>
        {show ? (
          <h2 className="text-center text-lg text-slate-200/30 font-bold mb-2">
            Thank you for purchasing more than 10 products a 10% discount is
            applied
          </h2>
        ) : null}
        <h2 className="text-center text-2xl font-bold mb-4">
          Total Price: ${totalPrice.toFixed(2)}
        </h2>

        {paymentMethod === "cash" ? (
          <button
            className="bg-slate-900 w-[70%] mx-auto rounded-2xl px-10 py-2 hover:bg-slate-600 transition-colors duration-500"
            onClick={() => handlePlaceOrder()}
          >
            <h1 className="text-white text-xl text-center font-[600]">
              Place Order
            </h1>
          </button>
        ) : paymentMethod === "paypal" ? (
          <div className="mx-auto w-[70%]">
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AaKr2aN-CZLfLue_0LUIeYPckKmTCxu2JBZypcacxlF1dS3On9SPAOWDXdiR3sgWs7ktfZLvm3eCMbU6",
              }}
            >
              <PayPalButtons
                createOrder={handlePaypalPayment}
                // onApprove={onApprove}
                // onError={onError}
              />
            </PayPalScriptProvider>
          </div>
        ) : (
          <button
            className="bg-slate-900 w-[70%] mx-auto rounded-2xl px-10 py-2 hover:bg-slate-600 transition-colors duration-500"
            onClick={handleGoToPayment}
          >
            <h1 className="text-white text-xl text-center font-[600]">
              Go to stripe
            </h1>
          </button>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default CheckoutPage;
