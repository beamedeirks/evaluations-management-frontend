import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

const CategoryData = () => {
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

  const calculateMaxRatingByCategory = (category) => {
    const attendancesByCategory = attendances.filter((attendance) => attendance.category === category);
    const maxRating = Math.max(...attendancesByCategory.map((attendance) => attendance.noteFinal));
    return maxRating;
  };

  const calculateMinRatingByCategory = (category) => {
    const attendancesByCategory = attendances.filter((attendance) => attendance.category === category);
    const minRating = Math.min(...attendancesByCategory.map((attendance) => attendance.noteFinal));
    return minRating;
  };

  const categories = [...new Set(attendances.map((attendance) => attendance.category))];

  return (
    <div>
      <Title>Nota Máxima e Mínima por Categoria</Title>
      <DashboardContainer>
        {categories.map((category) => (
          <DashboardItem key={category}>
            <DashboardLabel>Categoria: {category}</DashboardLabel>
            <DashboardValue>Nota Máxima: {calculateMaxRatingByCategory(category)}</DashboardValue>
            <DashboardValue>Nota Mínima: {calculateMinRatingByCategory(category)}</DashboardValue>
          </DashboardItem>
        ))}
      </DashboardContainer>
    </div>
  );
};

export default CategoryData;
