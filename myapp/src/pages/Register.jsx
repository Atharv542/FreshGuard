import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, phone } = formData;
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/register`, { name, email, password, phone });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url('/bg-2.jpg')` }}>
      
      {/* Header */}
      <div className="w-full py-4">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-bold text-center mb-5">FreshGuards</h1>
      </div>

      {/* Register Form */}
      <div className="w-full max-w-sm md:max-w-md lg:w-1/3 border border-white shadow-lg rounded-lg p-6 sm:p-8 bg-black bg-opacity-75">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none bg-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-white rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-white rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full text-white font-bold py-2 px-4 border-2 border-orange-500 rounded-lg hover:bg-orange-500 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-sm text-center text-white">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

