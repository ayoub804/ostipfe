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
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: '16px', margin: '1rem 0', border: '1px solid var(--border)' }}>
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
        borderColor: '#00D1FF',
        backgroundColor: 'rgba(0, 209, 255, 0.3)',
        tension: 0.35,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#00D1FF',
        pointBorderColor: '#0a0a0a',
        pointBorderWidth: 3,
        borderWidth: 4,
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
        text: 'Température au fil du temps',
        color: 'var(--text)',
        font: {
          size: 24,
          weight: 'bold',
          family: 'Orbitron',
        },
        padding: {
          top: 10,
          bottom: 30,
        }
      },
      tooltip: {
        backgroundColor: 'var(--bg-secondary)',
        titleColor: 'var(--text)',
        bodyColor: 'var(--text-dim)',
        borderColor: 'var(--accent-muted)',
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
          display: true,
          text: 'Température (°C)',
          color: 'var(--text-dim)',
          font: {
            family: 'Orbitron',
            size: 16,
          }
        },
        ticks: {
          color: 'var(--text)',
          font: {
            family: 'Inter',
            size: 14,
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Heure',
          color: 'var(--text-dim)',
          font: {
            family: 'Orbitron',
            size: 16,
          }
        },
        ticks: {
          color: 'var(--text)',
          font: {
            family: 'Inter',
            size: 14,
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
      background: 'var(--bg-card)',
      borderRadius: '16px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      margin: '1.5rem 0',
      border: '1px solid var(--border)',
    }}>
      <Line data={chartData} options={options} />
    </div>
  );
}