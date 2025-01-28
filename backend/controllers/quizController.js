import Admin from "../models/adminModel.js";
import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";
// Controller to create a quiz by admin
export const createQuiz = async (req, res) => {
    try {
        const { title, description, numberofQuestions, questions, startTime, duration } = req.body;
        console.log(req.user)
        // Validate required fields
        // console.log(title,description,numberofQuestions,questions,startTime,duration)
        if (!title || !numberofQuestions || !questions || !startTime || !duration) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }
        
       console.log(questions.length,"l")
       console.log((numberofQuestions),"nu")
        // Check if the number of questions matches the length of the questions array
        if (numberofQuestions !== questions.length) {
            return res.status(400).json({ message: "Number of questions does not match the provided questions." });
        }

        // Create a new quiz instance
        const newQuiz = new Quiz({
            title,
            description,
            numberofQuestions,
            questions,
            startTime,
            duration,
            isActive: false,
        });

        // Save the quiz to the database
        await newQuiz.save();

        // Find the admin user (assume req.user contains admin info like userId)
        const adminId = req.user._id;
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Update the admin's quizzesCreated and dashboardMetrics
        admin.quizzesCreated.push({
            quizId: newQuiz._id,
            title: newQuiz.title,
            createdAt: new Date(),
        });
        admin.dashboardMetrics.totalQuizzes += 1;

        // Save the admin's updates
        await admin.save();

        res.status(201).json({ message: "Quiz created successfully!", quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ message: "Error creating quiz", error: error.message });
    }
};

export const getAllQuizzes = async (req, res) => {
    try {
        // Fetch all quizzes from the database
        const quizzes = await Quiz.find();

        // Check if quizzes exist
        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ message: "No quizzes found." });
        }

        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quizzes", error: error.message });
    }
};

export const getQuizById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters
        console.log(id)
        // Fetch the quiz by its ID
        const quiz = await Quiz.findById(id);

        // Check if the quiz exists
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        // Send the found quiz as a response
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz", error: error.message });
    }
};

export const submitQuiz = async (req, res) => {
    const { quizId, quizTitle, answers, score, totalQuestions, completedAt } = req.body;

    console.log(quizId, quizTitle, answers, score, totalQuestions, completedAt)

    try {
        const userId = req.user._id; // Assuming you're using middleware to extract logged-in user info
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.quizzesAttempted.push({
            quizId,
            quizTitle,
            answers,
            score,
            totalQuestions,
            completedAt,
        });

        user.dashboardMetrics.totalQuizzesAttempted += 1;
        user.dashboardMetrics.totalCorrectAnswers += answers.filter((a) => a.isCorrect).length;
        user.dashboardMetrics.averageScore =
            user.dashboardMetrics.totalQuizzesAttempted === 1
                ? score
                : (user.dashboardMetrics.averageScore +
                      score) /
                  user.dashboardMetrics.totalQuizzesAttempted;

        await user.save();
        res.status(200).json({ message: 'Quiz submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting quiz', error });
    }
};