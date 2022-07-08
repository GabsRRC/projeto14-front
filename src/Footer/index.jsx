import styled from "styled-components";
//import "./reset.css";
import wpp from "../assets/logo-wpp.svg";
import yt from "../assets/logo-yt.svg";
import tt from "../assets/logo-tt.svg";

export default function App() {
  return (
    <Footer>
      <span className="top">
        <p>
          {" "}
          <img src={wpp} /> (99) 9 9999-9999{" "}
        </p>
        <p>
          {" "}
          <img src={tt} /> @GR_store
        </p>
        <p>
          {" "}
          <img src={yt} /> GR store
        </p>
      </span>
      <span className="bottom">
        <p>GR Store</p>
        <p>Copyright©2022</p>
        <p>Todos os direitos reservados.</p>
      </span>
    </Footer>
  );
}

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #002e34;
  width: 100%;
  height: 120px;
  padding: 30px;
  gap: 22px;
  color: #f9f2e7;
  font-family: "roboto";

  img {
    margin-right: 6px;
    height: 18px;
    width: 18px;
  }

  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-bottom: -10px;

    p {
      margin: 3px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  .bottom {
    display: flex;
    flex-direction: row;

    p {
      font-size: 13px;
      margin: 4px;
    }
  }
`;
