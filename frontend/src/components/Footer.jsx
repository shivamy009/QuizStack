import React from "react";
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";

const Footer= () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* INFO Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">LOREM</h3>
            <ul>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Ipsum</a>
              </li>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Dolor Sit</a>
              </li>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Amet Consectetur</a>
              </li>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Adipiscing</a>
              </li>
              <li className="hover:text-gray-400">
                <a href="#">Elit</a>
              </li>
            </ul>
          </div>

          {/* RESOURCES Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">SED DO</h3>
            <ul>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Eiusmod Tempor</a>
              </li>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Incididunt Ut</a>
              </li>
              <li className="hover:text-gray-400">
                <a href="#">Labore Et Dolore</a>
              </li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">LOREM IPSUM</h3>
            <ul>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Excepteur Sint</a>
              </li>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Occaecat</a>
              </li>
              <li className="mb-2 hover:text-gray-400">
                <a href="#">Culpa Qui Officia</a>
              </li>
              <li className="hover:text-gray-400">
                <a href="#">Deserunt Mollit</a>
              </li>
            </ul>
          </div>

          {/* Newsletter and Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">Join Our Lorem Ipsum Newsletter</h3>
            <form className="flex w-full max-w-sm mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l bg-gray-700 text-white"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r"
              >
                Subscribe
              </button>
            </form>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <FaFacebookSquare />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaTwitterSquare />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaInstagramSquare />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
