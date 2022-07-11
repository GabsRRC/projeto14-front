import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./MainPage/index";
import LoginPage from "./LoginPage/index";
import CheckoutPage from "./CheckoutPage/index";
import AuthPage from "./AuthPage/index";
import SingUpPage from "./SingUpPage/index";
import UserContext from "./contexts/UserContext.js";
import TokenContext from "./contexts/TokenContext.js";
import CartContext from "./contexts/CartContext.js";
import CheckoutContext from "./contexts/CheckoutContext.js";
import LoginContext from "./contexts/LoginContext.js";
import Header from "./Header/index";
import Footer from "./Footer/index";
import Cart from "./Cart";
import styled from "styled-components";
import "./reset.css";

export default function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [cart, setCart] = useState([]);
  const [checkoutConfirmation, setCheckoutConfirmation] = useState("");
  const [loginConfirmation, setLoginConfirmation] = useState("");

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <CheckoutContext.Provider
            value={{ checkoutConfirmation, setCheckoutConfirmation }}
          >
            <LoginContext.Provider
              value={{ loginConfirmation, setLoginConfirmation }}
            >
              <BrowserRouter>
                <Header />
                <Container>
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cadastro" element={<SingUpPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                  </Routes>
                </Container>
                <Footer />
              </BrowserRouter>
            </LoginContext.Provider>
          </CheckoutContext.Provider>
        </CartContext.Provider>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 80vh;
  margin-top: 10vh;
`;
