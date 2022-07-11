import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import TokenContext from "../contexts/TokenContext.js";
import UserContext from "../contexts/UserContext.js";
import Loading from "../Loading/index.jsx";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textCatch, setTextCatch] = useState("");
  

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
      setTextCatch("usuário ou senha inválidos!");
    });
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Faça seu login na GR STORE</h3>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        <p>{textCatch}</p>
        {isLoading ? (
          <Button>
            <Loading />
          </Button>
        ) : (
          <Button disabled={isLoading}>Entrar</Button>
        )}
        <Link to="/cadastro"><h5>Ainda não fez seu cadastro? Clique aqui</h5></Link>
    
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
  width: 75%;

  p{
    color: red;
    font-size: 12px;
    font-family: "roboto";
  }

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

  h5{
    color: green;
    font-size: 16px;
    font-family: "roboto";
    font-weight: 700;
    text-decoration: underline;
  }
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  &::placeholder {
    color: #b2bec2;
    padding-left: 10px;
  }
`;
const Button = styled.button`
  width: 100%;
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
  border: none;
  margin-bottom: 50px;
  margin-top: 15px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  :hover {
    background-color: darkgreen;
    cursor: pointer;
    font-size: 24px;
  }
`;
