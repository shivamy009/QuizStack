import React from "react";
import { Line } from "react-chartjs-2";

const ScorelineChart = ({ quizzes }) => {
  const data = {
    labels: quizzes.map((quiz) => new Date(quiz.completedAt).toLocaleDateString()), // Dates for tooltips
    datasets: [
      {
        label: "Score",
        data: quizzes.map((quiz) => quiz.score),
        borderColor: "#FF8C00", // Orange color for score
        backgroundColor: "rgba(255, 140, 0, 0.2)", // Light orange
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          // Show quiz details in the tooltip
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `Quiz: ${quizzes[index].quizTitle}`;
          },
          afterTitle: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `Date: ${new Date(quizzes[index].completedAt).toLocaleDateString()}`;
          },
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            return `Score: ${quizzes[index].score}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { display: false }, // Hide x-axis labels
        grid: { drawTicks: false }, // Optionally hide tick marks
      },
      y: { 
        beginAtZero: true,
        max: 10, // Adjust maximum score if necessary
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ScorelineChart;
