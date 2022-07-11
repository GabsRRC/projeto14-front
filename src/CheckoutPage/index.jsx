import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../contexts/CartContext.js";
import pix from "../assets/pix-106.svg";
import creditCard from "../assets/credit-card.svg";
import boleto from "../assets/boleto.svg";

export default function Checkout() {
  //Ao clique de adicionar carrinho de um usuario => adicionar a um array vazio o array item e adicionar propriedade qtd : 1;
  const { cart, setCart } = useContext(CartContext);
  const [payment, setPaymant] = useState("");

  function choosePaymentMethod(e) {}
  function payFinish() {
    if (payment !== "") {
      console.log("Pagou");
    } else {
      alert("Por favor selecione uma forma de pagamento!");
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
    </CheckoutStyled>
  );
}

const CheckoutStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
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
    background-color: #044443;
    color: white;
    border: none;
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

const PaymentMetod = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin: 10px 0;
  padding: 5px;

  img {
    width: 70px;
    height: 30px;
    margin-right: 10px;
    object-fit: fill;
  }
`;
