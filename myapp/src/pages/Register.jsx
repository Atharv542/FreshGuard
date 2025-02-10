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
  const navigate= useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const { name, email, password, phone } = formData;
      const res= await axios.post(`https://freshguard-1.onrender.com/api/v1/auth/register`,{name,email,password,phone});
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/login')
      }
      else{
        toast.error(res.data.message)
      }
    }catch(error){
      console.log(error);
      toast.error("Something went wrong")
    }
  };

  return (
    <div className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url('/bg-2.jpg')` }}>
     
     <div className="home-container  w-100% flex justify-between " >
        <h1 className='text-white p-3 shadow-sm flex justify-between items-center px-5 mx-36 text-3xl font-bold '>FreshGaurds</h1>
      </div>
         
        <div className="min-h-screen flex items-center -mt-10 justify-center   p-4">
      <div className="w-full max-w-md border-2 border-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
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

          <button
            type="submit"
            className="card text-white font-bold rounded-lg w-full py-2 px-4 border border-yellow-500 "
          >
            Register
          </button>
        </form>
        <p className="mt-3 text-sm text-center text-white">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
    </div>
   
  );
};

export default Register;

