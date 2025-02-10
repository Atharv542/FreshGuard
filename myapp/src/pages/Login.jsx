import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [auth,setAuth]=useAuth();
  const navigate= useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await axios.post(`https://freshguard-1.onrender.com/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        });
        localStorage.setItem("auth",JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url('/bg-2.jpg')` }}>
        <div className="home-container  w-100% flex justify-between " >
        <h1 className='text-white p-3 shadow-sm flex justify-between items-center px-5 mx-36 text-3xl font-bold '>FreshGaurds</h1>
      </div>
        <div className=" -mt-10 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md  border-2 border-white  shadow-lg rounded-lg p-8 relative flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-transparent border border-white rounded-lg px-3 py-2">
            <FaEnvelope className="text-white mr-3" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 text-white bg-transparent focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex items-center bg-transparent border border-white rounded-lg px-3 py-2">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-2 text-white  bg-transparent focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full card text-white font-bold py-2 px-4 border-2 border-orange-500 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-white">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default Login;
