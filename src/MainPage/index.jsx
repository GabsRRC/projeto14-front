/*

Renderiza 

*/

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
//import UserContext from "./UserContext";
import axios from "axios";
import cart from "../assets/cart.svg"
import Pacman from "../Loading";

export default function RenderRegistros() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const promise = axios.get(
          "https://mock-api.driven.com.br/api/v5/cineflex/movies"
        );
    
        promise.then((response) => {
          setProducts([...response.data]);
          
        });
      }, []);

      if (products.length < 1) {
          return (
              <None>Carregando...</None>
          )
      } else {
        return(
            <Container>
               <>{products.map((product) => (<Registrar value={product.title} key={product.id} name={product.title}  image={product.posterURL} description={product.title}/> ))}</>
            </Container>
        )
      }
}


function Registrar({value, name, description, image}){

    return (

        <Registros>
          <div className="product">
            <div>
              <img src={image}/>
            </div>

            <div className="lista"> 
              <span className="titulo">{name}</span> 
              <span className="value"> R$ 2.000,00 à vista no PIX </span> 
              <span className="parcela" > 10x de R$220,00 sem juros </span>
              <span className="button"> <h6> COMPRAR AGORA</h6> </span> 
              <span className="cart">  <h6> Adicionar ao carrinho </h6>  </span> 
            </div>
          </div>
        </Registros>
    )
}


//Styles

const None = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
text-align: center;
color: #868686;
margin-top: 50%;
margin-left: 60px;
margin-right: 60px;

`

const Container = styled.div`
  display: flex;
  flex-direction: column;

`

const Registros = styled.div`
    //height: 200px;
    //background-color: #FFFFFF;
    //margin-top: 10px;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
    border-bottom-width: 1px;
    padding-bottom: 10px;
    padding-top: 10px;
    position: relative;
    font-family: 'roboto slab';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    display:flex;
    justify-content: space-between;

    .each{
        margin-left: 8px;
        margin-right: 8px;
    }

    img{
      width: 130px;
      height: 130px;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.33) 0px 15px 12px;
      margin-left: 8px;
    }

    .product{
      display:flex;
      flex-direction:row;
    }

    .titulo{
      color: black;
      font-weight: bold;
      margin-bottom: 4px;
      font-size: 22px;
    }

    .button{
      width: 200px;
      height: 30px;
      background-color: #C71515;
      border-radius: 5px;
      text-align: center;
      font-weight: 700;
      color: white;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
      margin: 6px;

      :hover{
        background-color: darkgreen;
        cursor: pointer;
        //margin: 10px;
        font-size: 19px;
      }
    }

    h6{
      margin-top: 4px;
    }

    .value{
      color: green;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: -1.1px;
      margin: 3px 0 3px 0;
    }

    .cart{
      width: 200px;
      height: 30px;
      //background-color: orange;
      border-radius: 5px;
      //text-align: center;
      font-weight: 700;
      //color:white;
      color: #C2581E;
      //ssssbox-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
      margin: 6px 3px 6px 10px; 
      text-shadow: 2px 4px 3px rgba(0,0,0,0.12);
      :hover{
        color: darkgreen;
        cursor: pointer;
        font-size: 18px;
      }
    }

    .parcela{
      color: gray;
      margin: 3px 0 3px 0;
    }

    .lista{
      display: flex;
      flex-direction: column;
      margin-left: 18px;
    }
`
