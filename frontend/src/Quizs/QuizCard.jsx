import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ name, status, startTime, author,id }) => {
  const navigate = useNavigate();  // Hook for navigation

  const handleCardClick = () => {
      navigate(`/test/${id}`);  // Navigate to test page with quiz ID
  };
  return (
    <div onClick={handleCardClick} className="bg-neutral hover:cursor-pointer hover:bg-slate-900 text-neutral-content shadow-lg rounded-lg p-4 w-64">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-100 truncate">{name}</h3>

      {/* Author */}
      <p className="mt-2 text-sm text-gray-400">By: <span className="font-medium text-gray-300">{author}</span></p>

      {/* Tag */}
      <div className="badge badge-error mt-2">FREE</div>

      {/* Details */}
      <p className="mt-4 capitalize text-sm text-gray-400">
        {status} • {new Date(startTime).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZone: "UTC" 
        })}
      </p>
    </div>
  );
};

export default QuizCard;
