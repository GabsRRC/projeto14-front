import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Cart() {
  return (
    <CartStyled>
      <CartProducts>
        <h1> Produtos do carrinho</h1>
        <Products>
          <ul>
            <li>FUnko 1</li>
            <li>FUnko 1</li>
            <li>FUnko 1</li>
            <li>FUnko 1</li>
            <li>FUnko 1</li>
            <li>FUnko 1</li>
          </ul>
        </Products>
      </CartProducts>
      <div>
        {" "}
        <div>Pagamento</div>
        <Link to="/checkout">Prossiga para o pagamento!</Link>
      </div>
    </CartStyled>
  );
}

const CartStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
  }
`;
const CartProducts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
`;
const Products = styled.div``;
