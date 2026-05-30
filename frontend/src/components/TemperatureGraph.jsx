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
      <div style={{ textAlign: 'center', padding: '4rem', color: 'white', background: 'var(--bg-card)', borderRadius: '16px', margin: '1rem 0', border: '1px solid var(--border)' }}>
        Aucune donnée de température disponible
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => {
      const date = new Date(d.timestamp);
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }),
    datasets: [
      {
        label: 'Température (°C)',
        data: data.map((d) => d.temperature),
        borderColor: '#3b82f6',
        tension: 0.35,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'temperature',
        color: '#d1d5db',
        font: {
          size: 16,
          weight: 'normal',
          family: 'sans-serif',
        },
        padding: {
          top: 0,
          bottom: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#00D1FF',
        borderWidth: 2,
        padding: 16,
        titleFont: {
          size: 16,
          family: 'Orbitron',
        },
        bodyFont: {
          size: 16,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: 'sans-serif',
            size: 12,
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
      x: {
        title: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: 'sans-serif',
            size: 12,
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  };

  return (
    <div style={{
      background: '#2b2b2b',
      borderRadius: '4px',
      padding: '1.5rem',
      margin: '1.5rem 0',
    }}>
      <Line data={chartData} options={options} />
    </div>
  );
}