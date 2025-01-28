import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  numberofQuestions: {
    type: Number,
    required: true,
  },
  questions: [
    {
      question: { type: String, required: true },
      questionimage: { type: String, default: '' },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  startTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // Duration in minutes
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      score: { type: Number },
      completedAt: { type: Date },
    },
  ],
  metrics: {
    totalParticipants: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 }, // Percentage of users who completed the quiz
  },
}, { timestamps: true });

const Quiz = mongoose.model('Quizs', quizSchema);
export default Quiz;
