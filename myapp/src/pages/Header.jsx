import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';
import Home from './Home';
import { VscSignOut } from "react-icons/vsc";
import { VscSignIn } from "react-icons/vsc";

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
    <div className="">
      <div className="home-container bg-black w-100% flex justify-between">
      <Link to='/'>
      <h1 className="text-white p-3 shadow-sm flex justify-between items-center px-5 mx-36 text-3xl font-bold">
          FreshGuards 🍃
        </h1>
      </Link>
        

        <div className="flex">
        {auth.user && (
  <>
    <Link to="/myItems">
      <button className="text-white py-1  shadow-sm mt-4 mx-2 flex justify-between items-center px-3 rounded-lg text-xl border border-orange-500 font-bold">
        + Add Item
      </button>
    </Link>

    <Link to="/view-recipe">
      <button className="text-white py-1  shadow-sm mt-4 mx-2 flex justify-between items-center px-3 rounded-lg text-xl border border-orange-500 font-bold">
        My Recipe
      </button>
    </Link>
  </>
)}
          {!auth.user ? (
            <>
            <p className="text-white text-2xl py-1 px-1 shadow-sm mt-2 -mx-5 flex justify-between items-center font-bold">Sign In</p>
            <Link to="/login">
              <button className="text-white py-1 px-1 shadow-sm mt-4 mx-5 flex justify-between items-center   font-bold">
                <VscSignIn className='w-10 text-3xl'/>
              </button>
            </Link>
            </>
          ) : (
            <Link onClick={handleLogout} to="/login">
              <button className="text-white py-1 px-1 shadow-sm mt-4 mx-1 flex justify-between items-center   font-bold">
                <VscSignOut className='w-10 text-3xl'/>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
