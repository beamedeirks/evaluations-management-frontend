import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import FormAttendances from "./components/FormAttendances";
import Sidebar from "./components/Sidebar";
import GlobalStyle from "./styles/global";

const Wrapper = styled.div`
  display: flex;
  width: 90vw;
  justify-content: center;
`;
const Container = styled.div`
  display: flex ;
  flex-direction: column;
  align-items: center;
  gap:10px;
`;

const Title = styled.h2`
  margin: 1.5rem 0 1.2rem 0;
`;

function FormScreen() {
  const [onAdd, setOnAdd] = useState(null);

  return (
    <>
      <Wrapper>
        <Sidebar />
        <Container>
          <Title>Formulário de controle de qualidade</Title>
          <FormAttendances onAdd={onAdd} setOnAdd={setOnAdd} />
          <Title></Title>
        </Container>
      </Wrapper>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default FormScreen;