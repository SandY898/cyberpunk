import styles from './ExchangeHistory.module.scss';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGate, useUnit } from 'effector-react';
import { $currencyStore } from '../../store/CurrencyStore';
import {
  $error,
  $hidden,
  $loading,
  $rates,
  historicalStoreGate,
  setHidden,
} from '../../store/HistoricalStore';

// Регистрация модулей Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const ExchangeRateChart: React.FC = () => {
  const { currencyFrom, currencyTo } = useUnit($currencyStore);
  const [rates, loading, error, hidden] = useUnit([
    $rates,
    $loading,
    $error,
    $hidden,
  ]);

  useGate(historicalStoreGate, { currencyFrom, currencyTo });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const data = {
    labels: rates.map((rate) => rate.date),
    datasets: [
      {
        label: `${currencyFrom} to ${currencyTo}`,
        data: rates.map((rate) => rate.rate),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: `Exchange Rate: ${currencyFrom} to ${currencyTo}`,
      },
    },
    scales: {
      y: { beginAtZero: false },
      x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
    },
  };

  return (
    <>
      {hidden ? (
        <button className={styles.HideButton} onClick={() => setHidden(false)}>
          H1D3
        </button>
      ) : (
        <button className={styles.HideButton} onClick={() => setHidden(true)}>
          Sh0VV
        </button>
      )}
      {hidden && <Line data={data} options={options} />}
    </>
  );
};

export default ExchangeRateChart;
