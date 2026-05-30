import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TemperatureGraph({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
        Aucune donnée de température disponible
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => {
      const date = new Date(d.timestamp);
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }),
    datasets: [
      {
        label: 'Température (°C)',
        data: data.map((d) => d.temperature),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Température au fil du temps',
        color: '#1e293b',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Température (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Heure',
        },
      },
    },
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      margin: '1rem 0',
      height: '400px'
    }}>
      <Line data={chartData} options={options} />
    </div>
  );
}