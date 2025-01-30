import React, { useEffect, useState } from "react";
// import animation from "../../assets/Girl Making schedule.mp4";
import animation from "../../../../frontend/public/Girl-Making-Schedule.mp4"
import { CalendarMinus2, Languages, NotebookText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizStore } from "../../store/useQuizStore";

const Testdetails = () => {
  const [openFAQ, setOpenFAQ] = useState(null); // Tracks which FAQ is expanded
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { id } = useParams();
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  const navigate = useNavigate();  // Hook for navigation
  const handleCardClick = () => {
    // Remove the test start time from localStorage
    localStorage.removeItem("testStartTime");
  
    // Navigate to the test page with quiz ID
    navigate(`/runningtest/${id}`);
  };
  
  
  const {getQuizbyid,singlequiz,isgettingQuiz}=useQuizStore();

useEffect(() => {
      // Fetch all quizzes when the component loads
      getQuizbyid(id);
    }, [getQuizbyid]);

    if (isgettingQuiz) {
      return <div>Loading quizzes...</div>;
    }
    console.log(singlequiz,"sio")
  const faqData = [
    {
      question: "How do I attempt the test?",
      answer: "Click on the 'Take Test' button to start the test. Ensure you have a stable internet connection.",
    },
    {
      question: "Can I pause the test?",
      answer: "No, the test must be completed in one session.",
    },
    {
      question: "What happens after I submit?",
      answer: "You will receive your score and a detailed performance analysis.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full p-6 mb-8">
        {/* Navigation */}
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <button className="text-gray-500 hover:text-gray-700">←</button>
          <span className="font-medium">Plus</span>
          <span>•</span>
          <span className="text-gray-800 font-semibold">
            All India Mock Test
          </span>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Section */}
          <div>
            <div className="mb-4">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                FREE
              </span>{" "}
              <span className="text-gray-600 text-sm">Test</span>
            </div>
            <h1 className="mt-8 text-2xl md:text-3xl font-bold text-gray-800 mb-8">
             {singlequiz?.data?.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-8 mt-8">
              <div className="flex items-center space-x-2">
                <span className="material-icons bg-slate-300 p-3 rounded-md">
                  <CalendarMinus2 className="text-4xl" />
                </span>
                <span>Held on {new Date(singlequiz?.data?.startTime).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZone: "UTC" 
        })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-icons bg-slate-300 p-3 rounded-md">
                  <NotebookText />
                </span>
                <span>{`${singlequiz?.data?.numberofQuestions} Q's • ${singlequiz?.data?.numberofQuestions * 4} marks • ${singlequiz?.data?.duration} mins`}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-icons bg-slate-300 p-3 rounded-md">
                  <Languages />
                </span>
                <span>Languages: English</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button onClick={handleCardClick} className="btn btn-primary w-full md:w-auto">
                Take test
              </button>
              <button className="btn btn-outline w-full md:w-auto" onClick={() => setIsDrawerOpen(true)}>
                Instructions
              </button>
            </div>
          </div>

          {/* Drawer Component */}
      <div className={`fixed mt-5 inset-0 z-50 ${isDrawerOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsDrawerOpen(false)}></div>
        <div className="fixed right-0 top-20 h-full w-80 bg-white shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Instructions</h2>
          <p className="text-gray-600">Please read all the instructions carefully before starting the test.</p>
          <button className="btn btn-primary mt-4" onClick={() => setIsDrawerOpen(false)}>
            Close
          </button>
        </div>
      </div>

          {/* Right Section */}
          <div className="hidden md:block">
            <div className="bg-yellow-50 rounded-lg p-4 flex items-center justify-center">
              <video
                className="w-3/4 md:w-2/3 rounded-md"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={animation} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">FAQs</h2>
        <ul className="space-y-4">
          {faqData.map((faq, index) => (
            <li key={index} className="border-b border-gray-300 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-medium text-gray-700">{faq.question}</h3>
                <span className="text-gray-500 text-4xl">
                  {openFAQ === index ? "−" : "+"}
                </span>
              </div>
              {openFAQ === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testdetails;
