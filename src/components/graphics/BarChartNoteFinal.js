import axios from 'axios';
import { BarElement, CategoryScale, Chart, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, BarElement);

const BarChartNoteFinal = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/attendances');
        const attendances = response.data;

        // Contar a quantidade de cada valor de noteFinal
        const noteFinalCounts = {};
        attendances.forEach((attendance) => {
          const noteFinal = attendance.noteFinal;

          if (!noteFinalCounts[noteFinal]) {
            noteFinalCounts[noteFinal] = 0;
          }

          noteFinalCounts[noteFinal]++;
        });

        // Formatar os dados para o gráfico de barras
        const labels = Object.keys(noteFinalCounts);
        const data = Object.values(noteFinalCounts);

        const datasets = [
          {
            label: 'Quantidade',
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
      <Bar
        data={chartData}
      />

    </div>
  );
};

export default BarChartNoteFinal;
