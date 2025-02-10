import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const authData = localStorage.getItem('auth');
  const auth = authData ? JSON.parse(authData) : null;
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (auth?.user?.email) {
      navigate('/myItems');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="home-container bg-black w-full min-h-screen relative">
      <div className="flex justify-center items-center h-72">
        <h1 className="font-bold text-[50px] text-center mt-8  text-white">
          FreshTrack: Keep Food <span className="text-orange-500">Fresh,</span> Waste <span className="text-orange-500">Less</span>
        </h1>
      </div>

      <div className="flex justify-center -my-8 items-center">
        <p className="text-xl text-center text-gray-400">
          Track expiry dates and discover delicious ways to use products before they expire. FreshGuard makes freshness easy.
        </p>
      </div>

      <div className="cta-buttons flex justify-center items-center mt-20">
      <button
          onClick={handleNavigation}
          className="text-white border border-yellow-500 p-2 rounded-md hover:scale-110"
        >
          Get Started
        </button>

      
      </div>

      <img src='/ss.png'></img>

     
    </div>
  );
}

export default Home;


