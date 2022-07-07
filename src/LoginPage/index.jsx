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

    const promise = axios.post("http://localhost:5000/login", body);

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

  h3 {
    text-align: center;
    font-size: 28px;
    width: 260px;
    margin-bottom: 15px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    color: #004443;
  }
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 303px;
  height: 45px;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  color: #666666;
  margin: 4px;

  &::placeholder {
    color: #b2bec2;
    padding-left: 10px;
  }
`;
const Button = styled.button`
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
  margin-top: 15px;
`;
