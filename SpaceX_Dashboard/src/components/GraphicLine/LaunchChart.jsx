import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';
import './graphicline.css'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const API_URL = 'http://98.81.111.230:3000/api/launches'; //Reemplazar por la URL de aws

function agruparPorAñoYEstado(lanzamientos) {
  const resultado = {};

  lanzamientos.forEach((lanzamiento) => {
    const año = new Date(lanzamiento.launch_time).getFullYear();
    const estado = (lanzamiento.launch_status || 'unknown').toLowerCase();

    if (!resultado[año]) {
      resultado[año] = { success: 0, failed: 0, upcoming: 0 };
    }

    if (estado === 'success') resultado[año].success++;
    else if (estado === 'failed') resultado[año].failed++;
    else if (estado === 'upcoming') resultado[año].upcoming++;
  });

  return resultado;
}

export function LaunchChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL);
        const launches = await res.json();
        const agrupado = agruparPorAñoYEstado(launches);

        const años = Object.keys(agrupado).sort();
        const success = años.map((a) => agrupado[a].success);
        const failed = años.map((a) => agrupado[a].failed);
        const upcoming = años.map((a) => agrupado[a].upcoming);

        setChartData({
          labels: años,
          datasets: [
            {
              label: 'Success',
              data: success,
              backgroundColor: '#4caf50',
              borderColor: 'rgba(76, 175, 80, 0.2)',
            },
            {
              label: 'Failed',
              data: failed,
              backgroundColor: '#f44336',
              borderColor: 'rgba(244, 67, 54, 0.2)',
            },
            {
              label: 'Upcoming',
              data: upcoming,
              backgroundColor: '#ff9800',
              borderColor: 'rgba(255, 152, 0, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }

    fetchData();
  }, []);

  if (!chartData) return <p>Cargando gráfica...</p>;

  return (
    <div className='chart-container'>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: { color: '#ffffff' }, // texto blanco en leyenda
            },
          },
          layout: {
            padding: 20
          },
          scales: {
            x: {
              ticks: { color: '#ffffff' }, // texto blanco en eje X
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
              beginAtZero: true,
              ticks: { color: '#ffffff' }, // texto blanco en eje Y
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }}
      />
    </div>
  );
}
