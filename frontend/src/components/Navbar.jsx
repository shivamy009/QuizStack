import React, { useState, useEffect, useRef } from 'react';
import { HiMenu } from 'react-icons/hi'; // Importing a menu icon from react-icons
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, UserRoundCheck } from 'lucide-react';
// import { logout } from '../../../backend/controllers/authController';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the menu container
   const {authUser,checkAuth,logout} = useAuthStore()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="top-0 z-10 sticky w-full flex justify-between items-center py-4 px-6 bg-opacity-80 bg-white shadow-lg">
      
      <h1 className="text-3xl font-bold text-purple-700">
        <Link to={'/'}>Quizizz</Link>
      </h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/quiz" className="text-gray-700 hover:text-purple-700 font-medium">Tests</Link>
        <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium">For Schools</Link>
        <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium">Solutions</Link>
        <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium">Resources</Link>
        <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium">For Business</Link>
      </nav>

      <div className="flex items-center space-x-4">
        <button className="btn btn-outline btn-primary hidden md:block">Get a quote</button>
        <div className="relative md:block hidden">
      {authUser ? (
        <img 
          src={authUser.profilePic} 
          alt="Profile"
          className="w-12 h-12 rounded-full border-gray-400 border-2 cursor-pointer"
          onClick={() => setShowPopup(!showPopup)}
        />
      ) : (
        <Link to={'/login'}>
          <button className="btn hidden md:block">Log In</button>
        </Link>
      )}
      {showPopup && authUser && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
          <Link onClick={() => setShowPopup(!showPopup)} to={authUser?.role==="admin" ? "/adminProfile":"/profile"} className="flex px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"> <UserRoundCheck className=' mr-2' /> Profile</Link>
          <button onClick={logout} className="flex w-full text-lg text-left px-4 py-2 text-gray-700 hover:bg-gray-100"><LogOut className=' mr-2' /> Logout</button>
        </div>
      )}
    </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button className="btn btn-outline btn-primary mr-2">Get a quote</button>
          <button
            className="text-gray-700 hover:text-purple-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <HiMenu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef} // Attach ref here
          className="absolute top-20 right-6 w-48 bg-white shadow-lg rounded-lg flex flex-col items-start py-4 px-6 space-y-4 md:hidden"
        >
          <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium" onClick={toggleMenu}>For Schools</Link>
          <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium" onClick={toggleMenu}>Plans</Link>
          <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium" onClick={toggleMenu}>Solutions</Link>
          <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium" onClick={toggleMenu}>Resources</Link>
          <Link to="#" className="text-gray-700 hover:text-purple-700 font-medium" onClick={toggleMenu}>For Business</Link>
          <Link to={'/login'} onClick={toggleMenu}>
            <button className="btn w-full">Log in</button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
