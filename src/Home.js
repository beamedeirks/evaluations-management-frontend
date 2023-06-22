import styled from "styled-components";
import EvaluationsManagementWelcome from "./assets/imgs/EvaluationsManagementWelcome.png";
import Sidebar from "./components/Sidebar";
import GlobalStyle from "./styles/global";

const Wrapper = styled.div`
  display: flex;
  width: 90vw;
  height: 90%;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;
const Image = styled.img``;

const Title = styled.h4`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem 0 1.2rem 0;
`;

function Home() {
  return (
    <>
      <Wrapper>
        <Sidebar />
        <Container>
          <Image src={EvaluationsManagementWelcome} alt="Welcome"></Image>
        </Container>
      </Wrapper>
      <Title>Desenvolvido por Beatriz Medeiros</Title>
      <GlobalStyle />
    </>
  );
}

export default Home;
