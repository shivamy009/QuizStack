import React from "react";
import { Line } from "react-chartjs-2";

const AccuracyChart = ({ quizzes }) => {
  const data = {
    labels: quizzes.map((quiz) => new Date(quiz.completedAt).toLocaleDateString()), // Dates for tooltips
    datasets: [
      {
        label: "Accuracy (%)",
        data: quizzes.map((quiz) => (quiz.score / quiz.totalQuestions) * 100),
        borderColor: "#42A5F5",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          // Customize the tooltip to show the quiz title and date
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `Quiz: ${quizzes[index].quizTitle}`;
          },
          afterTitle: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `Date: ${new Date(quizzes[index].completedAt).toLocaleDateString()}`;
          },
          label: (tooltipItem) => `Accuracy: ${tooltipItem.raw}%`,
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
        max: 110,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AccuracyChart;
