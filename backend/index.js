
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// const connectDB = require('./lib/db.js');
import connectDB from "./lib/db.js";

const app=express();

// const authRoutes=require('./routes/authRoute')
import authRoutes from "./routes/authRoute.js";
import quizRoute from "./routes/quizRoute.js"

dotenv.config();

const PORT = process.env.PORT||5001;
// const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://quiz-stack-delta.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoute);

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
