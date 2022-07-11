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
import dayjs from 'dayjs/esm/index.js'

export default function RenderSale() {
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

    if (!itemExist) {
      cartCopy.push({ ...product, qtd: 1 });
      setCart(cartCopy);
    } else {
      itemExist.qtd = itemExist.qtd + 1;
      setCart(cartCopy);
    }
  }

  if (products.length < 1) {
    return (
      <None>
        <PacmanLoader />
      </None>
    );
  } else {
    return (
      <Sale>
        <h4>OFERTAS DO DIA {dayjs().format('DD/MM')}</h4>
        <Container>
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
        </Container>
      </Sale>
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
        <span className="titulo">{name}</span>
        <div>
          <img src={image} alt={description} />
        </div>

        <div className="lista">
          <span className="parcela"> De R${value.toFixed(2)} </span>
          <span className="value">
            Por apenas R${(value * 0.75).toFixed(2)}
          </span>
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
const Sale = styled.div`
  h4 {
    //color: #f9f2e7;
    font-family: "alfa slab one";
    font-size: 20px;
    margin-left: 10px;
  }
`;

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
  flex-direction: row;
  overflow: scroll;
  width: 400px;
  margin-bottom: 40px;
`;

const Product = styled.div`
  //height: 200px;
  background-color: #ffffff;
  //margin-top: 10px;

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
    width: 100px;
    height: 100px;
    //box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    //rgba(0, 0, 0, 0.33) 0px 15px 12px;
    margin-left: 8px;
  }

  .product {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    //background-color:red;
    margin: 5px;
    border: solid 4px lightgray;
    border-radius: 6px;
  }

  .titulo {
    color: black;
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 20px;
    margin-top: 3px;
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
    margin: 6px 16px 0px 0;

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
    font-size: 22px;
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
    margin: 6px 3px 6px 14px;
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
    text-decoration: line-through;
  }

  .lista {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
  }
`;
