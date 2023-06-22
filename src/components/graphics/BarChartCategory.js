import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChartCategory = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/attendances');
        const attendances = response.data;

        // Contar a quantidade de atendimentos por categoria
        const categoryCounts = {};
        attendances.forEach((attendance) => {
          const category = attendance.category;

          if (!categoryCounts[category]) {
            categoryCounts[category] = 0;
          }

          categoryCounts[category]++;
        });

        // Formatar os dados para o gráfico de barras
        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

        const datasets = [
          {
            label: 'Quantidade de Atendimentos',
            data,
            backgroundColor: 'rgba(246, 133, 28, 0.3)', // Cor de fundo
            borderColor: 'rgba(254, 80, 0, 0.8)', // Cor da borda
            borderWidth: 1, // Largura da borda
          },
        ];

        setChartData({ labels, datasets });
      } catch (error) {
        console.error('Erro ao obter os dados do gráfico:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChartCategory;
