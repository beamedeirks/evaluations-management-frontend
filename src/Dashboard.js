import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import AttendantsData from "./components/graphics/AttendantsData";
import CategoryData from "./components/graphics/CategoryData";
import Data from "./components/graphics/Data";
import NotesData from "./components/graphics/NotesData";
import GlobalStyle from "./styles/global";

const Wrapper = styled.div`
  display: flex;
  width: 90vw;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:10px;
`;

const Title = styled.h2`
  margin: 1.5rem 0 1.2rem 0;
`;

function Dashboard() {
  
  return (
    <>
      <Wrapper>
        <Sidebar />
        <Container>
          <Title>Dashboard</Title>
          <Data />
          <NotesData />
          <CategoryData />     
          <AttendantsData /> 
          <Title></Title>
        </Container>
      </Wrapper>
      <GlobalStyle />
    </>
  );
}

export default Dashboard;
