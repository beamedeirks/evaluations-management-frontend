import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width:90vw;
  height: 90%;
  margin-left: 3rem;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  word-break: break-all;
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;

const Tr = styled.tr``;
const Th = styled.th`
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  border-bottom: inset;
  padding-bottom: 5px;

  @media ( max-width: 500px) {
    ${(props) => props.onlyWeb && "display:none"}
  }
`;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
     ${(props) => props.onlyWeb && "display:none"}
  }
`;

const GridAttendance = ({ attendance, setAttendances }) => {

  return (
    <Table>
      <Thead>
        <Tr>
          <Th alignCenter>Protocolo</Th>
          <Th alignCenter>Data</Th>
          <Th alignCenter>Atendente</Th>
          <Th alignCenter>Setor</Th>
          <Th alignCenter>Motivo do Erro</Th>
          <Th alignCenter>Categoria</Th>
          <Th alignCenter>Nota</Th>
        </Tr>
      </Thead>
      <Tbody>
        {attendance.map((item, i) => (
          <Tr key={i}>
            <Td alignCenter width="10%" onlyWeb>{item.systemProtocol}</Td>
            <Td alignCenter width="10%" onlyWeb>{item.date}</Td>
            <Td alignCenter width="13%" onlyWeb>{item.nameAttendant}</Td>
            <Td alignCenter width="9%" onlyWeb>{item.nameGroup}</Td>
            <Td width="22%" onlyWeb>{item.mistakesDescription}</Td>
            <Td alignCenter width="20%" onlyWeb>{item.category}</Td>
            <Td alignCenter width="6%" onlyWeb>{item.noteFinal}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

};


export default GridAttendance;