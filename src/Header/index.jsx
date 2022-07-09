import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../reset.css";
import cartImage from "../assets/cart.svg";
import person from "../assets/person.svg";
import cartoutline from "../assets/cart-outline.svg";
import personoutline from "../assets/person-outline.svg";
import { useContext } from "react";
import UserContext from "../contexts/UserContext.js";
import CartContext from "../contexts/CartContext.js";

export default function Header() {
  const { userInfo } = useContext(UserContext);
  const cart = useContext(CartContext);

  return (
    <HeaderTop>
      <div>
        <LinkStyled to="/" style={{ marginLeft: 0 }}>
          <h2>GR STORE</h2>
        </LinkStyled>
      </div>
      <HeaderIcons>
        <LinkStyled to="/cart">
          <div>
            <img src={cartImage} />
          </div>
          <p className="quantidade">{cart.cart.length}</p>
        </LinkStyled>
        <LinkStyled to="/auth">
          <div>
            <img src={person} />
          </div>
          <p className="username">{userInfo.name}</p>
        </LinkStyled>
      </HeaderIcons>
    </HeaderTop>
  );
}

const HeaderTop = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 6%;
  height: 8vh;
  border-bottom: 1px solid black;
  background-color: #004443;

  h2 {
    color: #f9f2e7;
    font-family: "alfa slab one";
    font-size: 26px;
  }
`;
const HeaderIcons = styled.div`
  display: flex;
  z-index: 22;
  padding-left: 10px;
  LinkStyled {
    margin-left: 10px;
  }
`;

const LinkStyled = styled(Link)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: initial;
  text-decoration: none;
  margin-left: 10px;
  color: white;
  position: relative;

  img {
    height: 32px;
    width: 32px;
    margin: 5px 0;
  }
  .quantidade {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    background-color: #3ac2c0;
    opacity: 0.89;
    width: 20px;
    height: 20px;
    border-radius: 50%;

    position: absolute;
    top: -3px;
    right: -2px;
  }
  .username {
    position: absolute;
    bottom: -10px;
  }
`;
