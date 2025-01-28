
// import { signup, login, logout, checkAuth } from "../controllers/authController.js";
import express from "express";
import { createQuiz, getAllQuizzes, getQuizById, submitQuiz } from "../controllers/quizController.js";
import { protectRoute } from "../middleware/authMidlleware.js";


const router = express.Router();

router.post("/createquiz",protectRoute, createQuiz);
router.get("/getAllquiz", getAllQuizzes);
router.get("/quizbyid/:id", getQuizById);
router.post("/submitQuiz",protectRoute, submitQuiz);


export default router;