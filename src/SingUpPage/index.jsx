import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: "r@r.com",
      password: "12345",
    };

    const promise = axios.post("https://api-grstore.herokuapp.com/cadastro", user);
    promise.then((response) => {
      console.log(response.data);
      setUser({ ...response.data.user });
    });
    promise.catch((response) => {
      console.log(response.error);
      alert("Não foi possível efetuar o cadastro no momento!");
    });
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input type={"text"} placeholder="Nome" />
        <Input type={"text"} placeholder="Email" />
        <Input type={"password"} placeholder="Senha" />
        <Input type={"password"} placeholder="Confirme sua senha" />
        <Button>Cadastro!</Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 100px;
  width: 80%;
`;
const Input = styled.input`
  font-size: 20px;
  padding-left: 10px;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;

  color: black;
  background-color: #b2bec2;
  border: none;
  &::placeholder {
    color: #271f1ff6;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #b2bec2;
  color: #271f1ff6;

  border: none;

  width: 100%;
  padding: 5px;
  font-size: 20px;
`;
