import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">✅ TODO Master</h3>
            <p className="text-gray-400">
              A simple yet powerful todo application
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © {new Date().getFullYear()} TODO App. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Built with React, Vite, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;