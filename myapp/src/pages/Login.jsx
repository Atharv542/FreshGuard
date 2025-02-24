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
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
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
    <div className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url('/bg-2.jpg')` }}>
      
      {/* Header */}
      <div className="w-full py-4">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-bold text-center mb-16">FreshGuards</h1>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm md:max-w-md lg:w-1/3 border border-white shadow-lg rounded-lg p-6 sm:p-8 bg-black bg-opacity-75">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div className="flex items-center bg-transparent border border-white rounded-lg px-3 py-2">
            <FaEnvelope className="text-white mr-3" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 text-white bg-transparent focus:outline-none focus:ring focus:ring-orange-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-transparent border border-white rounded-lg px-3 py-2">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-2 text-white bg-transparent focus:outline-none focus:ring focus:ring-orange-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full text-white font-bold py-2 px-4 border-2 border-orange-500 rounded-md hover:bg-orange-500 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-sm text-center text-white">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
