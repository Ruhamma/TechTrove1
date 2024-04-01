import { Provider } from "react-redux";
import "./App.css";
import {
  LoginPage,
  SignUpPage,
  HomePage,
  ProfilePage,
  CartPage,
  ProductPage,
  ProductDetailsPage,
  CheckoutPage,
  OrderSuccessPage,
  ContactUsPage,
} from "./routes/Route.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Store from "./redux/store.js";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user.js";
import { getAllProducts } from "./redux/actions/product.js";
import AdminCreateProduct from "./pages/Admin/AdminCreateProduct.jsx";
import { Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(getAllProducts());
  });
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin-dashboard" element={<AdminCreateProduct />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          <Route
            path="*"
            element={
              <div>
                {" "}
                <img
                  src="/images/404.svg"
                  alt="Page not found"
                  className="w-[60%] h-[100vh] mx-auto"
                />{" "}
              </div>
            }
          />
        </Routes>
        <Toaster  richColors/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
