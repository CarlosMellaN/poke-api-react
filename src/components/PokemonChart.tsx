import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface PokemonChartProps {
  stats: { base_stat: number; stat: { name: string } }[];
}
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
export const PokemonChart: React.FC<PokemonChartProps> = ({ stats }) => {
  const chartData = {
    labels: stats.map((stat) => stat.stat.name.toUpperCase()),
    datasets: [
      {
        label: "",
        data: stats.map((stat) => stat.base_stat),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Rojo
          "rgba(54, 162, 235, 0.6)", // Azul
          "rgba(255, 206, 86, 0.6)", // Amarillo
          "rgba(75, 192, 192, 0.6)", // Verde agua
          "rgba(153, 102, 255, 0.6)", // Morado
          "rgba(255, 159, 64, 0.6)", // Naranja
        ],
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "Poppins",
            size: 10,
          },
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "Poppins",
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: -1,
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto h-96">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
