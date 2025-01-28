import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import QuizSidebar from "./QuizSidebar";
import { useQuizStore } from "../store/useQuizStore";



const QuizPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('completed');
    const { getAllQuizzes, quizzes, isgettingQuiz } = useQuizStore();  
  
    useEffect(() => {
      // Fetch all quizzes when the component loads
      getAllQuizzes();
    }, [getAllQuizzes]);

    if (isgettingQuiz) {
      return <div>Loading quizzes...</div>;
    }

    const categorizeQuizzes = () => {
      const now = new Date();
      const categorized = {
        ongoing: [],
        completed: [],
        upcoming: [],
      };
  
      console.log(quizzes,",f")
      quizzes?.data?.forEach((quiz) => {
        const startTime = new Date(quiz.startTime);
        const endTime = new Date(startTime.getTime() + quiz.duration * 60000); // Convert minutes to milliseconds
  
        if (now < startTime) {
          categorized.upcoming.push(quiz);
        } else if (now >= startTime && now <= endTime) {
          categorized.ongoing.push(quiz);
        } else {
          categorized.completed.push(quiz);
        }
      });
  
      return categorized;
    };
  
    const categorizedQuizzes = categorizeQuizzes();
  
  
    console.log(quizzes)
    // const quizzess = {
    //   completed: [
    //     { name: 'Math Quiz', status: 'Completed', endDate: '2025-01-10', author: 'John Doe' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //     { name: 'Science Quiz', status: 'Completed', endDate: '2025-01-12', author: 'Jane Smith' },
    //   ],
    //   upcoming: [
    //     { name: 'History Quiz', status: 'Upcoming', endDate: '2025-01-20', author: 'Emily Clark' },
    //     { name: 'Geography Quiz', status: 'Upcoming', endDate: '2025-01-25', author: 'Robert Brown' },
    //   ],
    //   ongoing: [
    //     { name: 'English Quiz', status: 'Ongoing', endDate: '2025-01-15', author: 'Alice Johnson' },
    //   ],
    // };
    
  
    return (
        <div>
      <div className=" w-full flex flex-col   h-screen">
        <div className=" top-20 sticky ">
        <QuizSidebar onCategorySelect={setSelectedCategory} />

        </div>
        <div className=" min-h-screen w-full bg-white">
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 capitalize text-center">{selectedCategory} Quizzes</h1>
          <div className="flex flex-wrap justify-start items-center gap-6 mx-auto">
              {categorizedQuizzes[selectedCategory]?.length > 0 ? (
                categorizedQuizzes[selectedCategory].map((quiz, index) => (
                  <QuizCard
                    key={index}
                    name={quiz.title}
                    status={selectedCategory}
                    startTime={quiz.startTime}
                    duration={quiz.duration}
                    author={quiz.author}
                    id={quiz._id}
                  />
                ))
              ) : (
                <p className=" text-center">No quizzes available for this category.</p>
              )}
            </div>
        </main>
            </div>
      </div>
      </div>
    );
  };
  
  export default QuizPage;