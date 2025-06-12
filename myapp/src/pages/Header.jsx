import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';
import { VscSignOut, VscSignIn, VscMenu } from "react-icons/vsc";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
  };

  return (
    <div className="bg-black w-full p-4 shadow-md">
      <div className="flex justify-between items-center px-5 md:px-10 lg:px-20">
        
        {/* Logo */}
        <Link to="/" className="text-white text-2xl sm:text-3xl font-bold">
          FreshGuards 🍃
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="text-white text-2xl sm:hidden" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <VscMenu />
        </button>

        {/* Navigation (Desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          {auth.user && (
            <>
              <Link to="/myItems">
                <button className="text-white py-2 px-4 text-base md:text-lg border border-orange-500 rounded-lg font-bold">
                  + Add Item
                </button>
              </Link>

              <Link to="/view-recipe">
                <button className="text-white py-2 px-4 text-base md:text-lg border border-orange-500 rounded-lg font-bold">
                  My Recipe
                </button>
              </Link>
            </>
          )}

          {!auth.user ? (
            <div className="flex items-center gap-2">
              <p className="text-white text-lg hidden md:block">Sign In</p>
              <Link to="/login">
                <button className="text-white flex items-center">
                  <VscSignIn className="w-7 md:w-9 text-3xl" />
                </button>
              </Link>
            </div>
          ) : (
            <Link onClick={handleLogout} to="/login">
              <button className="text-white flex items-center">
                <VscSignOut className="w-7 md:w-9 text-3xl" />
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center gap-3 mt-3">
          {auth.user && (
            <>
              <Link to="/myItems">
                <button className="text-white py-2 px-4 border border-orange-500 rounded-lg font-bold w-full">
                  + Add Item
                </button>
              </Link>

              <Link to="/view-recipe">
                <button className="text-white py-2 px-4 border border-orange-500 rounded-lg font-bold w-full">
                  My Recipe
                </button>
              </Link>
            </>
          )}

          {!auth.user ? (
            <Link to="/login" className="text-white flex items-center gap-2">
              <VscSignIn className="text-3xl" />
              <span className="text-lg">Sign In</span>
            </Link>
          ) : (
            <Link onClick={handleLogout} to="/login" className="text-white flex items-center gap-2">
              <VscSignOut className="text-3xl" />
              <span className="text-lg">Logout</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;


