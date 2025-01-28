import React from 'react';
import { FaCheckCircle, FaClock, FaPlayCircle } from 'react-icons/fa';

const QuizSidebar = ({ onCategorySelect }) => {
  return (
    <nav className="bg-gray-100 p-4 border-b border-gray-300 flex justify-center items-center space-x-20 shadow-lg top-0 sticky">
      <button
        className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 font-medium"
        onClick={() => onCategorySelect('completed')}
      >
        <FaCheckCircle className="text-green-500" />
        <span>Completed</span>
      </button>

      <button
        className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 font-medium"
        onClick={() => onCategorySelect('upcoming')}
      >
        <FaClock className="text-yellow-500" />
        <span>Upcoming</span>
      </button>

      <button
        className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 font-medium"
        onClick={() => onCategorySelect('ongoing')}
      >
        <FaPlayCircle className="text-blue-500" />
        <span>Ongoing</span>
      </button>
    </nav>
  );
};

export default QuizSidebar;
