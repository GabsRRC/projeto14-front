import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./MainPage/index";
import LoginPage from "./LoginPage/index";
import CheckoutPage from "./CheckoutPage/index";
import AuthPage from "./AuthPage/index";
import SingUpPage from "./SingUpPage/index"
import styled from "styled-components";
import "./reset.css";

export default function Header (){
    <Header>
        <div>
        <LinkStyled to="/" style={{ marginLeft: 0 }}>
            <h2>GR STORE</h2>
        </LinkStyled>
        </div>
        <HeaderIcons>
        <LinkStyled to="/checkout">Carrinho</LinkStyled>
        <LinkStyled to="/login">User</LinkStyled>
        </HeaderIcons>
    </Header>
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 6%;
  height: 8vh;
  border-bottom: 1px solid black;
  background-color: #004443;

  h2{
    color:#f9f2e7;
  }

`;
const HeaderIcons = styled.div`
  display: flex;

  padding-left: 10px;
  LinkStyled {
    margin-left: 10px;
  }
`;

const LinkStyled = styled(Link)`
  color: initial;
  text-decoration: none;
  margin-left: 10px;
`;