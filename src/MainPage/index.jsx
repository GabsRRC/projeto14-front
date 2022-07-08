/*

Renderiza 

*/

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext.js";
import TokenContext from "../contexts/TokenContext.js";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import CartContext from "../contexts/CartContext.js";

export default function RenderProducts() {
  const [products, setProducts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const { token } = useContext(TokenContext);
  const userInfo = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const promise = axios.get("http://localhost:5000/products");

    promise.then((response) => {
      //setIsLogged(isLoggedUser);
      setProducts([...response.data]);
    });
  }, []);

  function isLoggedUser() {
    if (token === "") {
      console.log("Usuário não logado!!");
      return false;
    } else {
      console.log("Usuário logado");
      return true;
    }
  }

  function addItemToCart(id, value, name, description, image) {
    const cartCopy = [...cart];
    const product = {
      _id: id,
      name: name,
      description: description,
      value: value,
      image: image,
    };
    const itemExist = cartCopy.find((item) => item._id === id);

    console.log(itemExist);
    if (!itemExist) {
      cartCopy.push({ ...product, qtd: 1 });
      setCart(cartCopy);
    } else {
      itemExist.qtd = itemExist.qtd + 1;
      setCart(cartCopy);
    }
    console.log(cartCopy);
  }

  if (products.length < 1) {
    return (
      <None>
        <PacmanLoader />
      </None>
    );
  } else {
    return (
      <Container>
        <>
          {products.map((product) => (
            <Products
              value={product.value}
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
              addItemToCart={addItemToCart}
              isLogged={isLogged}
            />
          ))}
        </>
      </Container>
    );
  }
}

function Products({
  value,
  name,
  description,
  image,
  isLogged,
  id,
  addItemToCart,
}) {
  return (
    <Product>
      <div className="product">
        <div>
          <img src={image} alt={description} />
        </div>

        <div className="lista">
          <span className="titulo">{name}</span>
          <span className="value">R$ {value * 0.9} à vista no PIX</span>
          <span className="parcela"> 10x de R${value / 10} sem juros </span>
          <span className="button">
            {" "}
            <h6> COMPRAR AGORA</h6>{" "}
          </span>
          <span className="cart">
            {" "}
            <h6
              onClick={() => addItemToCart(id, value, name, description, image)}
            >
              {" "}
              Adicionar ao carrinho{" "}
            </h6>{" "}
          </span>
        </div>
      </div>
    </Product>
  );
}

//Styles

const None = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #868686;
  margin-top: 50%;
  margin-left: 60px;
  margin-right: 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 55px;
`;

const Product = styled.div`
  //height: 200px;
  //background-color: #FFFFFF;
  //margin-top: 10px;
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
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.33) 0px 15px 12px;
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
      //margin: 10px;
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
    //background-color: orange;
    border-radius: 5px;
    //text-align: center;
    font-weight: 700;
    //color:white;
    color: #c2581e;
    //ssssbox-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
