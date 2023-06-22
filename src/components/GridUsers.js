import React from "react";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";

const Table = styled.table`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  max-width: 1200px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;

export const Tr = styled.tr``;
export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media ( max-width: 500px) {
    ${(props) => props.onlyWeb && "display:none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
     ${(props) => props.onlyWeb && "display:none"}
  }
`;

const GridUsers = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Login</Th>
          <Th onlyWeb>Nome</Th>
          <Th>Email</Th>
          <Th>Permissão</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="25%">{item.login}</Td>
            <Td width="28%" onlyWeb>{item.name}</Td>
            <Td width="28%" onlyWeb>{item.email}</Td>
            <Td width="28%" onlyWeb>{item.nameGroup}</Td>
            <Td alignCenter width="5%">
              <FiEdit onClick={() => handleEdit(item)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

};


export default GridUsers;