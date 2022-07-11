import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../contexts/CartContext.js";
import TokenContext from "../contexts/TokenContext.js";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  function cartSum() {
    let valor = 0;

    cart.map((item) => {
      valor += item.qtd * item.value;
    });

    return valor;
  }

  function addItemFromCart(id, value, name, description, image) {
    const cartCopy = [...cart];
    const product = {
      _id: id,
      name: name,
      description: description,
      value: value,
      image: image,
    };
    const itemExist = cartCopy.find((item) => item._id === id);

    if (!itemExist) {
      cartCopy.push({ ...product, qtd: 1 });
      setCart(cartCopy);
    } else {
      itemExist.qtd = itemExist.qtd + 1;
      setCart(cartCopy);
    }
  }
  function removeItemFromCart(id) {
    const cartCopy = [...cart];

    const item = cartCopy.find((item) => item._id === id);
    if (item.qtd > 1) {
      item.qtd = item.qtd - 1;
      setCart(cartCopy);
    } else {
      const arrayFiltered = cartCopy.filter(
        (product) => product._id !== item._id
        
      );
      if (window.confirm("Você deseja excluir o item do carrinho ?")) {
        setCart(arrayFiltered);
      }
    }
  }
  function proceedToCheckout() {
    if (isLoggedUser()) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  }
  function isLoggedUser() {
    if (token === "") {
      console.log("Usuario deslogado");
      return false;
    } else {
      console.log("Usuario logado");
      return true;
    }
  }
  return (
    <CartStyled>
      <CartProducts>
        <h1> Produtos do carrinho</h1>
        <Products>
          {cart.length === 0 ? (
            <EmptyCart>
              <p>Carrinho está vazio!</p>{" "}
              <p>
                Por favor, primeiro adicione um item ao carrinho e depois volte
                aqui
              </p>
            </EmptyCart>
          ) : (
            cart.map((product, key) => {
              return (
                <Product
                  value={product.value}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  id={product._id}
                  key={key}
                  qtd={product.qtd}
                  isEmpty={cart}
                  cartSum={cartSum}
                  addItemFromCart={addItemFromCart}
                  removeItemFromCart={removeItemFromCart}
                />
              );
            })
          )}
        </Products>

        {cart.length === 0 ? (
          ""
        ) : (
          <>
            <TotalValue>
              <span>Valor Total: </span>
              <p>
                {" "}
                R$ {cartSum() * 0.9} à vista ou R$ {cartSum()} parcelado em até
                10X sem juros.
              </p>
            </TotalValue>

            <Checkout>
              <LinkStyled onClick={proceedToCheckout}>
                Prossiga para o pagamento!
              </LinkStyled>
            </Checkout>
          </>
        )}
      </CartProducts>
    </CartStyled>
  );
}
function Product({
  value,
  name,
  description,
  image,
  isLogged,
  id,
  qtd,
  cartSum,
  addItemFromCart,
  removeItemFromCart,
}) {
  return (
    <>
      <ProductStyled>
        <div className="product">
          <div>
            <img src={image} alt={description} />
          </div>

          <div className="lista">
            <span className="titulo">{name}</span>
            <span className="value">R$ {value * 0.9} à vista no PIX</span>
            <span className="parcela"> 10x de R${value / 10} sem juros </span>
            <span className="quantidade">Quantidade : {qtd} itens</span>
            <AddRemoveButtons>
              <Button
                bgColor={"green"}
                onClick={() => {
                  addItemFromCart(id, value, name, description, image);
                  cartSum();
                }}
              >
                {" "}
                +{" "}
              </Button>
              <Button
                bgColor={"red"}
                onClick={() => {
                  removeItemFromCart(id);
                  cartSum();
                }}
              >
                {" "}
                -{" "}
              </Button>
            </AddRemoveButtons>
          </div>
        </div>
      </ProductStyled>
    </>
  );
}

const TotalValue = styled.div`
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  width: 80%;
  font-weight: bold;
  text-align: center;
  gap: 20px;

  span {
    color: #032525;
  }
  p {
    line-height: 30px;
    color: #666;
  }
`;

const CartStyled = styled.div`
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
`;
const CartProducts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
  font-family: "roboto";
`;
const Products = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductStyled = styled.div`
  width: 330px;
  border-bottom-style: solid;
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
  padding-bottom: 10px;
  padding-top: 10px;
  position: relative;
  font-family: "roboto slab";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  display: flex;
  justify-content: space-between;

  .each {
    margin-left: 8px;
    margin-right: 8px;
  }

  img {
    width: 130px;
    height: 130px;
    margin-left: 8px;
  }

  .product {
    display: flex;
    flex-direction: row;
  }

  .titulo {
    color: black;
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 22px;
  }
  .quantidade {
    font-size: 16px;
    color: #808080;
    margin-top: 2px;
  }

  .button {
    width: 200px;
    height: 30px;
    background-color: #c71515;
    border-radius: 5px;
    text-align: center;
    font-weight: 700;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    margin: 6px 6px 6px 0;

    :hover {
      background-color: darkgreen;
      cursor: pointer;
      font-size: 19px;
    }
  }

  h6 {
    margin-top: 4px;
  }

  .value {
    color: green;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -1.1px;
    margin: 3px 0 3px 0;
  }

  .cart {
    width: 200px;
    height: 30px;
    border-radius: 5px;
    font-weight: 700;
    color: #c2581e;
    margin: 6px 3px 6px 0px;
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.12);
    :hover {
      color: darkgreen;
      cursor: pointer;
      font-size: 18px;
    }
  }

  .parcela {
    color: gray;
    margin: 3px 0;
  }

  .lista {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
  }
`;
const AddRemoveButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding: 1px 7px;
  min-width: 25px;
`;
const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  .title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  p {
    font-size: 20px;
    margin-top: 20px;
    text-align: center;
  }
`;

const LinkStyled = styled.button`
  text-decoration: none;
  margin: 5px;
  border-radius: 8px;
  font-size: 20px;
  padding: 8px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  background-color: #c71515;
  border-radius: 5px;
  text-align: center;
  font-weight: 700;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  margin: 6px 6px 6px 0;
  border:0;

    :hover {
      background-color: darkgreen;
      cursor: pointer;
      font-size: 19px;
    }
`;
