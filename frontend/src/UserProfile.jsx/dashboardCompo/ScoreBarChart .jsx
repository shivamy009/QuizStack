import React from "react";
import { Bar } from "react-chartjs-2";

const ScoreBarChart = ({ quizzes }) => {
  const data = {
    labels: quizzes.map((quiz) => quiz.quizTitle),
    datasets: [
      {
        label: "Score",
        data: quizzes.map((quiz) => quiz.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ScoreBarChart;
