import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import TokenContext from "../contexts/TokenContext.js";
import UserContext from "../contexts/UserContext.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    const promise = axios.post("https://api-grstore.herokuapp.com/login", body);
    promise.then((response) => {
      setUser({ ...response.data.user });
      setToken({ ...response.data.token });
      navigate("/");
    });
    promise.catch((response) => {
      console.log(response.error);
      alert("Usuário ou senha inválidos!");
    });
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <Input
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button>Entrar</Button>
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
