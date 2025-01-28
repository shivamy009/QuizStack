import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const CorrectIncorrectPieChart = ({ totalCorrect, totalIncorrect }) => {
  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Questions Distribution",
        data: [totalCorrect, totalIncorrect],
        backgroundColor: ["#4CAF50", "#F44336"], // Green for correct, red for incorrect
        hoverBackgroundColor: ["#66BB6A", "#E57373"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${value} questions`;
          },
        },
      },
    },
  };

  return (
    <div className=" w-1/3 ">
      <h2>Total Questions Analysis</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CorrectIncorrectPieChart;
