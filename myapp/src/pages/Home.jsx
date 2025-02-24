import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="home-container bg-black w-full min-h-screen flex flex-col-reverse md:flex-col justify-center items-center">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="font-bold text-[50px] text-white mt-8">
          FreshTrack: Keep Food <span className="text-orange-500">Fresh,</span> Waste <span className="text-orange-500">Less</span>
        </h1>
        <p className="text-xl text-gray-400 mt-4">
          Track expiry dates and discover delicious ways to use products before they expire. FreshGuard makes freshness easy.
        </p>
        <div className="cta-buttons mt-8">
          <button
            onClick={handleNavigation}
            className="text-white border border-yellow-500 p-2 rounded-md hover:scale-110 transition-transform"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Image Section (on mobile, moved to right) */}
    <img src="/ss.png" alt="FreshGuard Preview" className=" sm:w-[40%] lg:w-[100%] w-full" />
      
    </div>
  );
}

export default Home;



