import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./MainPage/index";
import LoginPage from "./LoginPage/index";
import CheckoutPage from "./CheckoutPage/index";
import AuthPage from "./AuthPage/index";
import SingUpPage from "./SingUpPage/index";
import Header from "./Header/index";
import styled from "styled-components";
import "./reset.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<SingUpPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Container>
      <Footer>
        <p>GR Store</p>
        <p>Copyright©2022</p>
        <p>Todos os direitos reservados.</p>
      </Footer>
    </BrowserRouter>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 80vh;
  margin-top: 40px;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #002e34;
  height: 12vh;
  width: 100%;
  gap: 22px;
  color: #f9f2e7;
`;

