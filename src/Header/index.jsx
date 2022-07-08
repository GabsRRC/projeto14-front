import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../reset.css";
import cart from "../assets/cart.svg";
import person from "../assets/person.svg";
import cartoutline from "../assets/cart-outline.svg";
import personoutline from "../assets/person-outline.svg";

export default function Header() {
  return (
    <HeaderTop>
      <div>
        <LinkStyled to="/" style={{ marginLeft: 0 }}>
          <h2>GR STORE</h2>
        </LinkStyled>
      </div>
      <HeaderIcons>
        <LinkStyled to="/cart">
          <img src={cart} />
        </LinkStyled>
        <LinkStyled to="/auth">
          <img src={person} />{" "}
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: initial;
  text-decoration: none;
  margin-left: 10px;
  color: white;

  img {
    height: 32px;
    width: 32px;
    margin: 5px;
  }
`;
