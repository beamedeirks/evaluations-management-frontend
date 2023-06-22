import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
//import PieChart from './PieChart';
import GridAttendance from "./components/GridAttendances";
import Sidebar from "./components/Sidebar";
import GlobalStyle from "./styles/global";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  margin: 1.5rem 0 1.2rem 0;
`;

function AttendancesConsult() {
  const [attendances, setAttendances] = useState([]);

  // ATUALIZAR OS DADOS
  const getAttendances = async () => {
    try {
      const res = await axios.get("http://localhost:3001/attendances");
      setAttendances(res.data.sort((a, b) => (a.systemProtocol > b.systemProtocol ? 1 : -1)));
    } catch (error) {
      toast.error("Ocorreu um erro ao obter os atendimentos. Por favor, tente novamente.");
    }
  };

  useEffect(() => {
    getAttendances();
  }, []);

  return (
    <>
      <Wrapper>
        <Sidebar />
        <Container>
          <Title>Consulta de atendimentos</Title>
          <GridAttendance attendance={attendances} setAttendances={setAttendances} />
          <Title></Title>

        </Container>
      </Wrapper>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default AttendancesConsult;
