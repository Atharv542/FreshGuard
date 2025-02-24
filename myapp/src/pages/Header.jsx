import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';
import { VscSignOut, VscSignIn } from "react-icons/vsc";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
  };

  return (
    <div className="bg-black w-full p-3 shadow-md">
      <div className="flex justify-between items-center px-5 md:px-20 outline-none">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-white text-2xl sm:text-3xl font-bold outline-none">
            FreshGuards 🍃
          </h1>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          {auth.user && (
            <>
              <Link to="/myItems">
                <button className="text-white py-1 px-3 text-lg sm:text-xl border border-orange-500 rounded-lg font-bold">
                  + Add Item
                </button>
              </Link>

              <Link to="/view-recipe">
                <button className="text-white py-1 px-3 text-lg sm:text-xl border border-orange-500 rounded-lg font-bold">
                  My Recipe
                </button>
              </Link>
            </>
          )}

          {!auth.user ? (
            <div className="flex items-center gap-2">
              <p className="text-white text-lg sm:text-2xl font-bold hidden sm:flex">
                Sign In
              </p>
              <Link to="/login">
                <button className="text-white flex items-center">
                  <VscSignIn className="w-8 sm:w-10 text-3xl" />
                </button>
              </Link>
            </div>
          ) : (
            <Link onClick={handleLogout} to="/login">
              <button className="text-white flex items-center">
                <VscSignOut className="w-8 sm:w-10 text-3xl" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
