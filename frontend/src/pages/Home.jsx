import React from 'react';
// import img from '../assets/quizhome.jpeg'

const Home = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }} // Replace this URL with your background image
    >
      <main className="flex flex-col items-center text-center mt-16">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Introducing <span className="text-purple-600">Instructional Suite</span>
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">“I had no idea Quizizz could do that.”</p>
        <p className="text-gray-500 italic mb-8">- Almost everybody</p>
        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Create and deliver bell-to-bell curriculum resources that meet the needs of every student.
        </p>

        <div className="flex flex-wrap justify-center space-x-4">
          <button className="btn btn-primary">Teachers - Sign up for free</button>
          <button className="btn btn-outline">Admins - Learn more</button>
        </div>
      </main>

      <footer className="mt-16 text-gray-500 text-sm">English</footer>
    </div>
  );
};

export default Home;