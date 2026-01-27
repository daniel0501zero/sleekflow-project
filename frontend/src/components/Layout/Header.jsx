import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({isLogin, setIsLogin, user}) => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold flex items-center">
              TODO Master
            </h1>
              {isLogin === true ? <p className="text-indigo-100 mt-1"> Manage your tasks efficiently and stay productive</p> : <p className="text-indigo-100 mt-1">Welcome back, <span className='font-bold'>{user?.name}</span></p>}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <span className="px-3 py-1 bg-white/20 rounded-full">
                📅 {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <Link to="/userDetails" className={`px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 hover:shadow-2xl transition-colors transition ${isLogin === true && "hidden"}`} state={user}>
              <button >
                👤 Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;