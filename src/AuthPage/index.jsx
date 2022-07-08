// Nessa pagína haverá três opções : Sing-in, Sing-up, Sing-out

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthPage() {
  return (
    <Container>
      <p>Já tem cadastro?</p>
      <Link to="/login">
        <Button>Logar</Button>
      </Link>

      <p>Primeira vez por aqui?</p>
      <Link to="/cadastro">
        <Button> Cadastro </Button>
      </Link>

      <p>Está de saída?</p>
      <Link to="/">
        <Button> Logout </Button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  font-family: roboto;

  p{
    font-weight: 700;
    margin-left: 5px;
    margin-bottom: 5px;
    
  }
`

const Button = styled.div`
  width: 303px;
  height: 45px;
  background: #00c16c;
  border-radius: 4.63636px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 20.976px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
  margin: 5px;
  padding: 0;
  margin: 0;
  border: none;
  margin-bottom: 50px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  :hover{
    background-color: darkgreen;
    font-size: 24px;
  }
`;
