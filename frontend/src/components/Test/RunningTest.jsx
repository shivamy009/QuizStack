import { Bookmark, CircleAlert, Dot, Loader } from "lucide-react";
import React, { useEffect, useState,useRef } from "react";
import { useQuizStore } from "../../store/useQuizStore";
import { useNavigate, useParams } from "react-router-dom";

// import React, { useEffect, useState, useRef } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedStartTime = localStorage.getItem("testStartTime");
    if (storedStartTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime, 10)) / 1000);
      const remainingTime = duration * 60 - elapsedTime;
      return Math.max(remainingTime, 0);
    } else {
      const startTime = Date.now();
      localStorage.setItem("testStartTime", startTime.toString());
      return duration * 60;
    }
  });

  const hasEnded = useRef(false);

  useEffect(() => {
    if (timeLeft === 0 && !hasEnded.current) {
      hasEnded.current = true; // Mark as ended
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          localStorage.removeItem("testStartTime");
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <span>{formatTime(timeLeft)}</span>;
};


const RunningTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [original, setOriginal] = useState([]);
  const [questionStates, setQuestionStates] = useState({});
  const {
    getQuizbyid,
    singlequiz,
    isgettingQuiz,
    submitQuiz,
    issubmittingQuiz,
  } = useQuizStore();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getQuizbyid(id);
  }, [getQuizbyid]);

  useEffect(() => {
    if (singlequiz?.data?.questions) {
      setOriginal(singlequiz.data.questions);
      setQuestionStates(
        singlequiz.data.questions.reduce((acc, _, index) => {
          acc[index] = { selectedAnswer: "", marked: false, answered: false };
          return acc;
        }, {})
      );
    }
  }, [singlequiz]);

  const handleOptionSelect = (questionIndex, selectedAnswer) => {
    setQuestionStates((prev) => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        selectedAnswer:
          prev[questionIndex].selectedAnswer === selectedAnswer
            ? ""
            : selectedAnswer,
        answered: selectedAnswer ? true : false,
      },
    }));
  };

  const handleMark = () => {
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestion]: {
        ...prev[currentQuestion],
        marked: !prev[currentQuestion].marked,
      },
    }));
  };

  const handleSaveAndNext = () => {
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestion]: {
        ...prev[currentQuestion],
        marked: !prev[currentQuestion].answered && prev[currentQuestion].marked,
      },
    }));
    if (currentQuestion < original.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleEndTest = async () => {
    const userResponses = original.map((_, index) => ({
      questionId: original[index]._id,
      selectedAnswer: questionStates[index]?.selectedAnswer || "",
      isCorrect:
        original[index].correctAnswer === questionStates[index]?.selectedAnswer,
    }));

    const quizData = {
      quizId: id,
      quizTitle: singlequiz?.data?.title,
      answers: userResponses,
      score: userResponses.filter((res) => res.isCorrect).length,
      totalQuestions: original.length,
      completedAt: new Date(),
    };

    console.log(quizData, "jicewfink");

    // try {
    //     const response = await fetch('/api/submitQuiz', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(quizData),
    //     });
    //     if (response.ok) {
    //         alert('Test submitted successfully!');
    //     }
    // } catch (error) {
    //     console.error('Error submitting test:', error);
    // }
    localStorage.removeItem("testStartTime");
    submitQuiz(quizData, navigate);
  };

  if (isgettingQuiz) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (original.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">
          No questions available for this quiz.
        </p>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex">
        <div className="w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{singlequiz?.data?.title}</h1>
            <p>
              Time Remaining:{" "}
              <Timer duration={singlequiz?.data?.duration || 30} onTimeUp={handleEndTest} />
            </p>
          </div>
          <div className="card bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1}
            </h2>
            <p className="mb-4">{original[currentQuestion].question}</p>
            <div className="mb-4">
              {original[currentQuestion]?.questionimage ? (
                <img
                  className="h-40 max-h-60 max-w-full"
                  src={original[currentQuestion].questionimage}
                  alt={`Question ${currentQuestion + 1}`}
                />
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {original[currentQuestion].options.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={
                      questionStates[currentQuestion]?.selectedAnswer === option
                    }
                    onChange={() => handleOptionSelect(currentQuestion, option)}
                    className="radio radio-primary"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-between space-x-4">
              <button
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(prev - 1, 0))
                }
                className="btn"
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <div className="space-x-4 flex items-center">
                <button
                  onClick={handleMark}
                  className={`flex border-2 px-3 py-2 rounded-md ${
                    questionStates[currentQuestion]?.marked
                      ? "border-yellow-500"
                      : "border-gray-400"
                  }`}
                >
                  <Bookmark /> Mark
                </button>
                <button onClick={handleSaveAndNext} className="btn btn-success">
                  Save & Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-1/3">
          <div className="w-full flex flex-col  items-center bg-white ml-4 shadow-lg min-h-screen">
            <div className=" w-full flex justify-between items-center px-2 mt-4">
              <h1 className=" font-bold flex items-center space-x-2">
                <CircleAlert className=" mr-2" /> Mock Test
              </h1>
              <button
                onClick={handleEndTest}
                className="font-bold border-2 border-black px-2 py-1 rounded-md"
              >
                End Test
              </button>
            </div>
            <div className=" w-full flex flex-col justify-center items-center px-2 mt-4">
              <p className="w-full justify-start items-center">Attempt All</p>
              <div className=" flex justify-center items-center space-x-4 w-full">
                <p className=" flex justify-center items-center">
                  {" "}
                  <Dot className=" text-green-500 h-16 w-16" /> answered
                </p>
                <p className=" flex justify-center items-center">
                  {" "}
                  <Dot className=" text-yellow-500 h-16 w-16" /> marked
                </p>
                <p className=" flex justify-center items-center">
                  {" "}
                  <Dot className=" text-gray-400 h-16 w-16" /> unanswered
                </p>
              </div>
            </div>
            <div className=" w-full flex flex-col justify-center items-center px-2 mt-4 mb-8">
              <p className="w-full justify-start items-center">Questions</p>
              <div className="flex flex-wrap  gap-4 mx-4 mt-2">
                {original.map((_, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 flex justify-center items-center border rounded-md ${
                      questionStates[index]?.marked
                        ? "bg-yellow-500"
                        : questionStates[index]?.answered
                        ? "bg-green-500 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningTest;
