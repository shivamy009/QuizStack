import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content Area */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Layout;