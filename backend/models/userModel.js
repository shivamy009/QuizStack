import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user', // Either 'user' or 'admin'
  },
  profilePic: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  quizzesAttempted: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quizs' },
      quizTitle: String,
      answers: [
        {
          questionId: { type: mongoose.Schema.Types.ObjectId },
          selectedAnswer: { type: String },
          isCorrect: { type: Boolean },
        },
      ],
      score: { type: Number },
      totalQuestions: { type: Number },
      completedAt: { type: Date },
    },
  ],
  dashboardMetrics: {
    totalQuizzesAttempted: { type: Number, default: 0 },
    totalCorrectAnswers: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
  },
}, { timestamps: true });

const User = mongoose.model('Users', userSchema);
export default User;
