import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// const navigate=useNavigate();
export const useQuizStore = create((set, get) => ({
  authUser: null,
  isCreatingquiz: false,
  isgettingQuiz: false,
  issubmittingQuiz:false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  quizzes: [],
  singlequiz: [],
  socket: null,


  createQuiz: async (data,navigate) => {
    set({ isCreatingquiz: true });
    try {
      const res = await axiosInstance.post("/quiz/createquiz", data,{
        'Content-Type': 'application/json',
      });
    //   set({ authUser: res.data });
      toast.success("Quiz created successfully");
      navigate('/adminProfile')
    //   get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCreatingquiz: false });
    }
  },

  getAllQuizzes: async () => {
    set({ isgettingQuiz: true });
    try {
      const res = await axiosInstance.get("/quiz/getAllquiz");
      // const data = await res.json();
      set({ quizzes: res });
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    } finally {
      set({ isgettingQuiz: false });
    }
  },

  getQuizbyid: async (id) => {
    set({ isgettingQuiz: true });
    try {
      const data = await axiosInstance.get(`/quiz/quizbyid/${id}`);
      // const data = await res.json();
      set({ singlequiz: data });
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    } finally {
      set({ isgettingQuiz: false });
    }
  },
  
  submitQuiz: async (data,navigate) => {
    set({ issubmittingQuiz: true });
    try {
      const res = await axiosInstance.post("/quiz/submitQuiz", data,{
        'Content-Type': 'application/json',
      });
    //   set({ authUser: res.data });
      toast.success("Quiz Submitted successfully");
      navigate('/')
    //   get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ issubmittingQuiz: false });
    }
  },


}));
