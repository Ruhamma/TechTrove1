import { Provider } from "react-redux";
import "./App.css";
import {
  LoginPage,
  SignUpPage,
  HomePage,
  ProfilePage,
  CartPage,
} from "./routes/Route.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Store from "./redux/store.js";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user.js";
import { getAllProducts } from "./redux/actions/product.js";
import AdminCreateProduct from "./pages/Admin/AdminCreateProduct.jsx";
import { ToastContainer } from "react-toastify";
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
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
