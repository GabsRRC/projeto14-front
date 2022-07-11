import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textPassword, setTextPassword] = useState("");
  const [textValid, setTextValid] = useState("");
  const [textName, setTextName] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const [textCatch, setTextCatch] = useState("");

  const navigate = useNavigate();

  function singUp(event) {
    event.preventDefault();
    setIsLoading(true);


    const body = {
      email,
      name,
      password, 
      passwordValid 
    };


    if(name.length < 4){
      setTextName("nome com mínimo de 4 caracteres");
      setIsLoading(false);
    }

    if (email.length < 4){
      setTextEmail("email inválido");
      setIsLoading(false);
    }

    if (password.length < 4){
      setTextPassword("senha com mínimo de 4 caracteres");
      setIsLoading(false);
    }

    if (password !== passwordValid){
      setTextValid("as senhas não são iguais");
      setIsLoading(false);
    }

    else {
      const promise = axios.post(
        "https://api-grstore.herokuapp.com/cadastro",
        body
      );
      promise
        .then((res) => {
          navigate("/login");
          setIsLoading(false);
        })
        .catch((err) => {
          alert("Algo deu errado, tente novamente");
          setTextCatch("Sua requisição não pode ser processada!")
          setIsLoading(false);
        });
    } 
  }
  return (
    <>
      <Form onSubmit={singUp}>
        <h3>Faça seu cadastro na GR STORE</h3>
        <Input
          type={"text"}
          placeholder="Nome"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
        <p>{textName}</p>
        <Input
          type={"text"}
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <p>{textEmail}</p>
        <Input
          type={"password"}
          placeholder="Senha"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <p>{textPassword}</p>
        <Input
          type={"password"}
          placeholder="Confirme sua senha"
          value={passwordValid}
          required
          onChange={(e) => setPasswordValid(e.target.value)}
          disabled={isLoading}
        />
        <p>{textValid}</p>
        <p>{textCatch}</p>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loading /> : "Cadastrar"}
        </Button>
        <Link to="/login"><h5>Já possui cadastro? Clique aqui</h5></Link>
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

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

  :hover{
    background-color: darkgreen;
    cursor: pointer;
    font-size: 24px;
  }
`;
