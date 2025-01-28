import React from "react";
import KeyMetrics from "./dashboardCompo/KeyMetrics ";
import QuizzesAttempted from "./dashboardCompo/QuizzesAttempted ";
import AccuracyChart from "./dashboardCompo/AccuracyChart ";
import ScoreBarChart from "./dashboardCompo/ScoreBarChart ";
import ScorelineChart from "./dashboardCompo/ScorelineChart";
import CorrectIncorrectPieChart from "./dashboardCompo/CorrectIncorrectPieChart";



const UserProfile = () => {
    const data = {
        quizzesAttempted: [
          {
            quizId: "64e17fc18d5a47e3b12e4d4f",
            quizTitle: "General Knowledge",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4d50", selectedAnswer: "Paris", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4d51", selectedAnswer: "Mars", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4d52", selectedAnswer: "Berlin", isCorrect: false },
            ],
            score: 2,
            totalQuestions: 3,
            completedAt: "2025-01-16T10:30:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4d60",
            quizTitle: "Science Quiz",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4d61", selectedAnswer: "H2O", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4d62", selectedAnswer: "Saturn", isCorrect: false },
            ],
            score: 1,
            totalQuestions: 2,
            completedAt: "2025-01-14T14:15:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4d70",
            quizTitle: "Math Quiz",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4d71", selectedAnswer: "5", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4d72", selectedAnswer: "9", isCorrect: false },
            ],
            score: 1,
            totalQuestions: 2,
            completedAt: "2025-01-12T09:45:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4d80",
            quizTitle: "History Quiz",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4d81", selectedAnswer: "1947", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4d82", selectedAnswer: "Napoleon", isCorrect: false },
              { questionId: "64e17fc18d5a47e3b12e4d83", selectedAnswer: "Roman Empire", isCorrect: true },
            ],
            score: 2,
            totalQuestions: 3,
            completedAt: "2025-01-10T16:00:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4d90",
            quizTitle: "Geography Quiz",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4d91", selectedAnswer: "Mount Everest", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4d92", selectedAnswer: "Amazon River", isCorrect: false },
            ],
            score: 1,
            totalQuestions: 2,
            completedAt: "2025-01-09T08:30:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4da0",
            quizTitle: "Programming Basics",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4da1", selectedAnswer: "JavaScript", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4da2", selectedAnswer: "Python", isCorrect: false },
              { questionId: "64e17fc18d5a47e3b12e4da3", selectedAnswer: "C++", isCorrect: true },
            ],
            score: 2,
            totalQuestions: 3,
            completedAt: "2025-01-08T11:20:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4db0",
            quizTitle: "Literature Quiz",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4db1", selectedAnswer: "Shakespeare", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4db2", selectedAnswer: "Homer", isCorrect: true },
            ],
            score: 2,
            totalQuestions: 2,
            completedAt: "2025-01-07T13:45:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4dc0",
            quizTitle: "Physics Quiz",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4dc1", selectedAnswer: "Newton", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4dc2", selectedAnswer: "Thermodynamics", isCorrect: false },
            ],
            score: 1,
            totalQuestions: 2,
            completedAt: "2025-01-06T17:10:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4dd0",
            quizTitle: "Chemistry Quiz",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4dd1", selectedAnswer: "Oxygen", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4dd2", selectedAnswer: "Hydrogen", isCorrect: false },
            ],
            score: 1,
            totalQuestions: 2,
            completedAt: "2025-01-05T12:00:00Z",
          },
          {
            quizId: "64e17fc18d5a47e3b12e4de0",
            quizTitle: "Sports Quiz",
            answers: [
              { questionId: "64e17fc18d5a47e3b12e4de1", selectedAnswer: "Cricket", isCorrect: false },
              { questionId: "64e17fc18d5a47e3b12e4de2", selectedAnswer: "Soccer", isCorrect: true },
              { questionId: "64e17fc18d5a47e3b12e4de3", selectedAnswer: "Tennis", isCorrect: true },
            ],
            score: 2,
            totalQuestions: 3,
            completedAt: "2025-01-04T15:50:00Z",
          },
        ],
        dashboardMetrics: {
          totalQuizzesAttempted: 10,
          totalCorrectAnswers: 18, // Sum of all correct answers
          averageScore: 60, // (Total Score / Total Questions) * 100
        },
      };
      const totalCorrect = data.dashboardMetrics.totalCorrectAnswers;
  const totalQuestionsAttempted = data.quizzesAttempted.reduce(
    (acc, quiz) => acc + quiz.totalQuestions,
    0
  );
  const totalIncorrect = totalQuestionsAttempted - totalCorrect;
      
  return (
    <div className="flex flex-col w-full">
      <h1 className=" text-center">User Dashboard</h1>
      <div className=" space-y-4 mt-4  w-full flex flex-col">
      <KeyMetrics metrics={data.dashboardMetrics} />
      <QuizzesAttempted quizzes={data.quizzesAttempted} />
      </div>
      <div className=" grid grid-cols-2 mt-4 ">
        {/* //accuracy */}
        <div>
        <AccuracyChart quizzes={data.quizzesAttempted} />
        </div>
        {/* scoreline */}
        <div>
        <ScorelineChart quizzes={data.quizzesAttempted} />
        </div>
        {/* correctincorrectpi */}
        <div>
        {/* <CorrectIncorrectPieChart quizzes={data.quizzesAttempted} /> */}
        </div>
        {/* <div> */}
        {/* </div> */}
      </div>
      <div className="h-96 flex justify-center items-center mt-4">
        <ScoreBarChart quizzes={data.quizzesAttempted} />
      </div>
      {/* correctincorrectpi */}
      <div className=" flex justify-center items-center mt-4 mb-4">
        <CorrectIncorrectPieChart  totalCorrect={totalCorrect} totalIncorrect={totalIncorrect} />
      </div>
    </div>
  );
};

export default UserProfile;
