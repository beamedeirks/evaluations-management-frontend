import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import FormUsers from "./components/FormUsers";
import GridUsers from "./components/GridUsers";
import Sidebar from "./components/Sidebar";
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

function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //ATUALIZAR OS DADOS
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      setUsers(res.data.sort((a, b) => (a.login > b.login ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Wrapper>
        <Sidebar />
        <Container>
          <Title>Usuários</Title>
          <FormUsers onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
          <GridUsers users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
          <Title></Title>
        </Container>
      </Wrapper>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default UsersScreen;
