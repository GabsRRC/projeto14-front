import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pix from "../assets/pix-106.svg";
import creditCard from "../assets/credit-card.svg";
import boleto from "../assets/boleto.svg";
import CartContext from "../contexts/CartContext.js";
import TokenContext from "../contexts/TokenContext.js";
import UserContext from "../contexts/UserContext.js";
import CheckoutContext from "../contexts/CheckoutContext.js";
import axios from "axios";
import { useEffect } from "react";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const { userInfo } = useContext(UserContext);
  const { setCheckoutConfirmation } = useContext(CheckoutContext);
  const [payment, setPayment] = useState("");
  const [alertText, setAlertText] = useState("");
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    if (token !== "") {
      setUserLogged(true);
    }
  }, []);

  function payFinish(e) {
    if (payment === "") {
      setAlertText("Escolha um método de pagamento para prosseguir!");
    } else {
      if (token !== "" && cart.length !== 0 && userLogged === true) {
        e.preventDefault();
        setAlertText("");
        const auth = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userCheckout = {
          name: userInfo.name,
          buyedProducts: cart,
          paymentMethod: payment,
        };

        axios.post("https://api-grstore.herokuapp.com/checkout", userCheckout, auth);
        setCart([]);
        setCheckoutConfirmation("Compra efetuada com sucesso!");
        navigate("/");
      } else {
        setAlertText("Por favor, faça o login, ou adicione itens ao carrinho!");
      }
    }
  }

  return (
    <CheckoutStyled>
      <h1>Escolha sua forma de pagamento!</h1>
      {userLogged ? (
        <>
          <CheckoutMetods>
            <label>
              <input
                type="radio"
                className="pagamento"
                value="pix"
                name="pagamento"
                onChange={(e) => setPayment(e.target.value)}
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
                onChange={(e) => setPayment(e.target.value)}
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
                onChange={(e) => setPayment(e.target.value)}
              />
              <img src={creditCard} />
              Cartão de crédito
            </label>
          </CheckoutMetods>
          <button onClick={payFinish}>Finalizar o pagamento!</button>
        </>
      ) : (
        <UserOff>
          Por favor, faça o login para poder finalizar o pagamento!
        </UserOff>
      )}

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

  p {
    color: red;
    margin-top: 50px;
    font-weight: 700;
    font-size: 22px;
  }

  h1 {
    margin-top: 20px;
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
    border: 0;

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
const UserOff = styled.div`
  width: 90%;
  font-size: 22px;
  font-weight: bold;
`;
