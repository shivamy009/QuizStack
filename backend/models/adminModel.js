import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
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
    default: 'admin',
  },
  profilePic: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  quizzesCreated: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quizs' },
      title: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  dashboardMetrics: {
    totalQuizzes: { type: Number, default: 0 },
    totalParticipants: { type: Number, default: 0 },
    averageQuizCompletionRate: { type: Number, default: 0 }, // As a percentage
  },
}, { timestamps: true });

const Admin  = mongoose.model('Admins', adminSchema);

export default Admin;