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

const Data = () => {
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

  const calculateAverageRating = () => {
    const totalRatings = attendances.reduce((acc, attendance) => acc + attendance.noteFinal, 0);
    const averageRating = totalRatings / attendances.length;
    return averageRating.toFixed(2);
  };

  const calculateMaxRating = () => {
    const maxRating = Math.max(...attendances.map((attendance) => attendance.noteFinal));
    return maxRating;
  };

  const calculateMinRating = () => {
    const minRating = Math.min(...attendances.map((attendance) => attendance.noteFinal));
    return minRating;
  };

  const countAttendances = attendances.length;
  const averageRating = calculateAverageRating();
  const maxRating = calculateMaxRating();
  const minRating = calculateMinRating();

  return (
    <div>
      <DashboardContainer>
        <DashboardItem>
          <DashboardLabel>Atendimentos</DashboardLabel>
          <DashboardValue>{countAttendances}</DashboardValue>
        </DashboardItem>
        <DashboardItem>
          <DashboardLabel>Média Notas</DashboardLabel>
          <DashboardValue>{averageRating}</DashboardValue>
        </DashboardItem>
        <DashboardItem>
          <DashboardLabel>Nota Máxima</DashboardLabel>
          <DashboardValue>{maxRating}</DashboardValue>
        </DashboardItem>
        <DashboardItem>
          <DashboardLabel>Nota Mínima</DashboardLabel>
          <DashboardValue>{minRating}</DashboardValue>
        </DashboardItem>
      </DashboardContainer>
    </div>
  );
};

export default Data;
