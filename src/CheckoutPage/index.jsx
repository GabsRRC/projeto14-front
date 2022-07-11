import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../contexts/CartContext.js";
import pix from "../assets/pix-106.svg";
import creditCard from "../assets/credit-card.svg";
import boleto from "../assets/boleto.svg";
import TokenContext from "../contexts/TokenContext.js";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [payment, setPaymant] = useState("");
  const [alertText, setAlertText] = useState("");
  const {token} = useContext(TokenContext)

  function choosePaymentMethod(e) {}
  function payFinish() {
    if (payment !== "") {
      console.log("Pagou");
      console.log(payment);
      console.log(cart);
      console.log(token);

      setAlertText("Escolha um método de pagamento para prosseguir!")
    }
  }
  return (
    <CheckoutStyled>
      <h1>Escolha sua forma de pagamento!</h1>
      <CheckoutMetods>
        <label>
          <input
            type="radio"
            className="pagamento"
            value="pix"
            name="pagamento"
            onChange={(e) => setPaymant(e.target.value)}
          />
          <img src={pix} />
          Pix
        </label>
        <label>
          <input
            type="radio"
            className="pagamento"
            value="boleto"
            name="pagamento"
            onChange={(e) => setPaymant(e.target.value)}
          />
          <img src={boleto} />
          Boleto Bancário
        </label>
        <label>
          <input
            type="radio"
            className="pagamento"
            value="cartao-de-credito"
            name="pagamento"
            onChange={(e) => setPaymant(e.target.value)}
          />
          <img src={creditCard} />
          Cartão de crédito
        </label>
      </CheckoutMetods>

      <button onClick={payFinish}>Finalizar o pagamento!</button>
      <p>{alertText}</p>
    </CheckoutStyled>
  );
}

const CheckoutStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  font-family: "roboto";
  text-align: center;

p{
  color: red;
  margin-top: 50px;
  font-weight: 700;
  font-size: 22px;
}

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  button {
    width: 80%;
    height: 34px;
    margin-top: 25px;
    border-radius: 10px;
    font-size: 20px;
    color: white;
    border: none;
    text-decoration: none;
    border-radius: 8px;
    font-size: 20px;
    padding: 8px;
    text-decoration: none;
    font-weight: bold;
    background-color: #c71515;
    border-radius: 5px;
    text-align: center;
    font-weight: 700;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    border:0;

    :hover {
      background-color: darkgreen;
      cursor: pointer;
      font-size: 19px;
    }
  }
`;
const CheckoutMetods = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  width: 90%;
  label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 50px;
    border-top: 0px solid #004443;
    border-bottom: 1px solid #004443;
    color: black;
    font-weight: bold;
    &:first-child {
      border-top: 1px solid #004443;
    }
    input {
      margin-right: 10px;
    }
    img {
      width: 50px;
      height: 50px;
      margin-left: 5px;
      margin-right: 20px;
    }
  }
`;
