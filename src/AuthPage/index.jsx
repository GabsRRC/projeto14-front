// Nessa pagína haverá três opções : Sing-in, Sing-up, Sing-out

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthPage() {

  return (
    <>

    <p>Já tem cadastro?</p>
    <Link to="/login"> <Button>Logar</Button> </Link> 

    <p>Primeira vez por aqui?</p>
    <Link to="/cadastro"> <Button> Cadastro </Button> </Link>

    <p>Está de saída?</p>
    <Link to="/"> <Button> Logout </Button> </Link>

    </>
  );
}



const Button = styled.div`
    width: 303px;
    height: 45px;
    background: #00c16c ;
    border-radius: 4.63636px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    margin: 5px;
    padding: 0;
    margin:0;
    border: none;
    margin-bottom: 50px;
`;
