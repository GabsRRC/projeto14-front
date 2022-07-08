import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <>
      <div>Carrinho</div>
      <Link to="/checkout">Prossiga para o pagamento!</Link>
    </>
  );
}
