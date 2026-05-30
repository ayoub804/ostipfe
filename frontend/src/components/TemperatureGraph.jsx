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
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
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
        backgroundColor: 'rgba(0, 209, 255, 0.15)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#00D1FF',
        pointBorderColor: '#0a0a0a',
        pointBorderWidth: 2,
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
        color: 'var(--text)',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'var(--bg-secondary)',
        titleColor: 'var(--text)',
        bodyColor: 'var(--text-dim)',
        borderColor: 'var(--border)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Température (°C)',
          color: 'var(--text-dim)',
        },
        ticks: {
          color: 'var(--text-muted)',
        },
        grid: {
          color: 'var(--border)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Heure',
          color: 'var(--text-dim)',
        },
        ticks: {
          color: 'var(--text-muted)',
        },
        grid: {
          color: 'var(--border)',
        },
      },
    },
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      margin: '1rem 0',
      height: '400px',
      border: '1px solid var(--border)',
    }}>
      <Line data={chartData} options={options} />
    </div>
  );
}