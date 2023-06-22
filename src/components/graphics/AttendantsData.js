import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;
  background-color #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
`;

const DashboardItem = styled.div`
  text-align: center;
  align-items: flex-end;
  gap: 10px;
  background-color: rgba(246, 133, 28, 0.3);
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
`;

const DashboardLabel = styled.p`
  font-weight: bold;
`;

const DashboardValue = styled.p`
  margin-top: 4px;
`;

const Title = styled.h3`
  margin: 1.5rem 0 0.7rem 0;
  text-align: center;
`;

const AttendantsData = () => {
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

  const calculateMaxRatingByAttendant = (attendant) => {
    const attendancesByAttendant = attendances.filter((attendance) => attendance.nameAttendant === attendant);
    const maxRating = Math.max(...attendancesByAttendant.map((attendance) => attendance.noteFinal));
    return maxRating;
  };

  const attendants = [...new Set(attendances.map((attendance) => attendance.nameAttendant))];

  return (
    <div>
      <Title>Nota Máxima por Atendente</Title>
      <DashboardContainer>
        {attendants.map((attendant) => (
          <DashboardItem key={attendant}>
            <DashboardLabel>Atendente: {attendant}</DashboardLabel>
            <DashboardValue>Nota Máxima: {calculateMaxRatingByAttendant(attendant)}</DashboardValue>
          </DashboardItem>
        ))}
      </DashboardContainer>
    </div>
  );
};

export default AttendantsData;
