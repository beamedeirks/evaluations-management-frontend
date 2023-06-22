import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  width:100%
  align-items: flex-end;
  gap:10px;
  flex-wrap: wrap;
  background-color #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px
`;

const DashboardItem = styled.div`
  text-align: center;
  width:5rem;
  align-items: flex-end;
  gap:10px;
  flex-wrap: wrap;
  background-color: rgba(246, 133, 28, 0.3);
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px
`;

const DashboardLabel = styled.p`
  font-weight: bold;
`;

const DashboardValue = styled.p`
  margin-top: 4px;
`;

const Title = styled.h3`
  margin: 1.5rem 0 0rem 0;
`;

const NotesData = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await axios.get('http://localhost:3001/attendances');
      setAttendances(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const countByRating = (rating) => {
    const count = attendances.filter((attendance) => attendance.noteFinal === rating).length;
    return count;
  };

  const countRating0 = countByRating(0);
  const countRating25 = countByRating(25);
  const countRating50 = countByRating(50);
  const countRating75 = countByRating(75);
  const countRating100 = countByRating(100);

  return (
    <>
      <Title>Quantidade de Notas por grau de erro</Title>
      <div>
        <DashboardContainer>
          <DashboardItem>
            <DashboardLabel>Nota 0</DashboardLabel>
            <DashboardValue>{countRating0}</DashboardValue>
          </DashboardItem>
          <DashboardItem>
            <DashboardLabel>Nota 25</DashboardLabel>
            <DashboardValue>{countRating25}</DashboardValue>
          </DashboardItem>
          <DashboardItem>
            <DashboardLabel>Nota 50</DashboardLabel>
            <DashboardValue>{countRating50}</DashboardValue>
          </DashboardItem>
          <DashboardItem>
            <DashboardLabel>Nota 75</DashboardLabel>
            <DashboardValue>{countRating75}</DashboardValue>
          </DashboardItem>
          <DashboardItem>
            <DashboardLabel>Nota 100</DashboardLabel>
            <DashboardValue>{countRating100}</DashboardValue>
          </DashboardItem>
        </DashboardContainer>
      </div>
    </>
  );
};

export default NotesData;
