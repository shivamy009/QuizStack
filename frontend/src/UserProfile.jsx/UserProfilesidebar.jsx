// import { Router } from 'express'
import { BookCheck, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import React from 'react'
import { Router,Route, Routes, Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import UserProfile from './UserProfile'
import Settingspage from './Settingspage'

const UserProfilesidebar = () => {
    const {authUser,checkAuth,logout} = useAuthStore()
    if (!authUser || authUser.role==='user'){
        <Navigate to={'/'}/>
    }
       
  return (
     <div className=' flex flex-row'> 
    <div className=' top-0 sticky'>
    <div className="min-h-screen h-full w-64 bg-gray-800 text-white flex flex-col items-center">
    {/* Admin Image */}
    <div className="mt-6 mb-4">
      <img
        src={authUser?.profilePic} // Replace with admin image URL
        alt="Admin"
        className="w-24 h-24 rounded-full border-4 border-gray-600"
      />
    </div>
    {/* Admin Name */}
    <h2 className="text-lg font-semibold">{authUser?.firstName} {authUser?.lastName}</h2>
    {/* Sidebar Menu */}
    <nav className="mt-6 w-full flex flex-col items-center">
      <ul className="space-y-4">
      <Link className=' mt-2 mb-4' to="/profile"><li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex"><LayoutDashboard className=' mr-2' /> Dashboard</li></Link>
      {/* <Link className=' my-2' to="/adminProfile/quizzes"><li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex"><BookCheck className=' mr-2' /> Quizzes</li></Link> */}
      <Link className=' my-2' to="/profile/settings"> <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex"><Settings className=' mr-2' />  Settings</li></Link>
        <li onClick={logout} className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex"><LogOut className=' mr-2'/>Logout</li>
      </ul>
    </nav>
  </div>
  </div>
  {/* Main Content */}
  <div className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<UserProfile/>} />
            {/* <Route path="/quizzes" element={<AdminQuizForm/>} /> */}
            <Route path="/settings" element={<Settingspage/>} />
          </Routes>
        </div>
  </div>
  )
}

export default UserProfilesidebar