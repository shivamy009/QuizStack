import React from "react";

const KeyMetrics = ({ metrics }) => {
  return (
    <div className="key-metrics">
      {/* <h2>Key Metrics</h2> */}
      <ul className=" w-full flex items-center justify-between text-center">
        <li className=" font-bold text-black">Total Quizzes Attempted: {metrics.totalQuizzesAttempted}</li>
        <li className=" font-bold text-black">Total Correct Answers: {metrics.totalCorrectAnswers}</li>
        <li className=" font-bold text-black">Average Score: {metrics.averageScore.toFixed(2)}%</li>
      </ul>
    </div>
  );
};

export default KeyMetrics;
