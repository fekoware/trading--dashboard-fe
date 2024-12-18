import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchAccounts } from '../api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchAccounts()
      .then((response) => {
        setAccounts(response.accounts);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError('An error occurred. Please check your internet connection or try again later.');
      });
  }, []);

  const chartData = {
    labels: accounts.map((account) => new Date(account.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Account Balance',
        data: accounts.map((account) => account.account_balance),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Account Equity',
        data: accounts.map((account) => account.account_equity),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: 'Account Balance and Equity Over Time',
        color: '#ffffff',
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.formattedValue;
            return `${label}: £${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 18,
          },
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Amount (£)',
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-gray-800">
      {isLoading ? (
        <p className="text-white">Loading accounts...</p>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : accounts.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Accounts Overview</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Line data={chartData} options={chartOptions} />
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="min-w-full table-auto text-white border-separate border-spacing-0 border-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-white">Date</th>
                    <th className="px-4 py-2 border-b border-white">Account Balance</th>
                    <th className="px-4 py-2 border-b border-white">Account Equity</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b border-white">{new Date(account.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border-b border-white">£{account.account_balance.toFixed(2)}</td>
                      <td className="px-4 py-2 border-b border-white">£{account.account_equity.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white">No accounts found.</p>
      )}
    </div>
  );
};

export default Accounts;
