import { Provider } from "react-redux";
import "./App.css";
import { LoginPage, SignUpPage, HomePage } from "./routes/Route.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Store from "./redux/store.js";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user.js";
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  });
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
