// import { useState } from 'react'
import './App.css'
// import Navbar from './components/Navbar'
import Home from './pages/Home'
// import { Router } from 'express'
import {Router, Route, Routes, BrowserRouter, Navigate } from 'react-router'
import Layout from './layout/Layout'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import QuizPage from './Quizs/QuizPage'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import Testdetails from './components/Test/Testdetails'
import AdminProfile from './Admin/AdminProfile'
import RunningTest from './components/Test/RunningTest'
import UserProfilesidebar from './UserProfile.jsx/UserProfilesidebar'


function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  useEffect(() => {
    checkAuth()
  },[checkAuth])
 console.log(authUser)
 console.log(authUser?.role)
 
 if (isCheckingAuth && !authUser)
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
  return (
    <BrowserRouter>
    {/* <Router> */}
    <Toaster/>
    <Routes>
      <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />

      <Route path="/signup" element={ !authUser ?
            <Layout>
              <Signup />
            </Layout>
          : <Navigate to="/" />
          } />

      <Route path="/login" element={ !authUser ?
            <Layout>
              <Login />
            </Layout>
          : <Navigate to="/" />
          } />

      <Route path="/quiz" element={
            <Layout>
              <QuizPage />
            </Layout>
          } />

      <Route path="/test/:id" element={
            <Layout>
              <Testdetails />
            </Layout>
          } />

<Route
    path="/adminProfile/*"
    element={
      authUser?.role === "admin" ? (
        <Layout>
          <AdminProfile />
        </Layout>
      ) : (
        <Navigate to="/" replace />
      )
    }
  />


<Route
    path="/profile/*"
    element={
      authUser?.role === "user" ? (
        <Layout>
          <UserProfilesidebar />
        </Layout>
      ) : (
        <Navigate to="/" replace />
      )
    }
  />


<Route
    path="/runningtest/:id"
    element={
        <Layout>
          <RunningTest />
        </Layout>
       
    }
  />
    </Routes>
    {/* </Router> */}
    
    </BrowserRouter>
  )
}

export default App
