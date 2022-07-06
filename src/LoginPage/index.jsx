import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import TokenContext from "../contexts/TokenContext.js";
import UserContext from "../contexts/UserContext.js";
import Loading from "../Loading/index.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      email,
      password,
    };

    const promise = axios.post("https://api-grstore.herokuapp.com/login", body);

    promise.then((response) => {
      setIsLoading(false);
      setUserInfo({ ...response.data.user });
      setToken(response.data.token);
      navigate("/");
    });
    promise.catch((response) => {
      console.log(response.error);
      setIsLoading(false);
      alert("Usuário ou senha inválidos!");
    });
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={isLoading}
          required
        />
        <Input
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        {isLoading ? (
          <Button disabled={isLoading}>
            <Loading />
          </Button>
        ) : (
          <Button disabled={isLoading}>Entrar</Button>
        )}
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
  height: 54px;
  margin-bottom: 20px;

  color: black;
  background-color: #b2bec2;

  border: none;
  border-radius: 5px;
  &::placeholder {
    color: #271f1ff6;
  }
  &:disabled {
    background-color: #5c6b70;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #004443;
  color: white;

  border: none;
  border-radius: 5px;

  width: 100%;
  padding: 5px;
  font-size: 20px;

  &:disabled {
    background-color: #5c6b70;
  }
`;
