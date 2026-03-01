import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const Signup = () => {

  //setting initial values
  const [formData,setFormData]=useState({
    username : "",
    password : ""
  });

  const [error,setError]=useState("");
  //Generic change handler
  const handleChange=(event)=>{
    const {name,value}=event.target
    setFormData((prevData)=>({
      ...prevData,//Keeping existing values
      [name]:value
    }))
  }

  const [success,setSuccess]=useState("")

  const handleSubmit=async(event)=>{
    event.preventDefault();
    if(formData.username===""||formData.password===""){
      setError("All fields required");
      return;
    }

    try{
      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/register`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      });
      
      const data=await res.json();
      if(!res.ok){
        setError(data.error || 'Signup Failed')
        return;
      }
      console.log("Token",data.token);
      setSuccess("Registered successfully 🎉");
      setFormData({ username: "", password: "" });
      setError("");

    }catch(err){
      setError('Server error')
    }
    
  }
  
  return (
    <>
    <title>IdeaSpark | Signup</title>
    <Navbar showLogin={false} showSignup={false} />
    <div className='px-2 bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className="bg-white p-8 w-full max-w-md rounded-xl shadow-lg">
        <h2 className='text-2xl font-bold text-center'>Create an Account for Free</h2>
        <p className='text-center p-2'>No credit card required</p>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            {success && (
            <p className="text-green-600 text-center font-medium p-2 mb-4">
              {success}
            </p>
            )}
            {error && (
              <p className="text-red-600 text-center font-medium p-2 mb-4">
                {error}
                </p>
              )}
            <label htmlFor="username" className='text-sm font-medium mb-0.5'>
              Username/Email
            </label>
            <input type="email"
            className='w-full p-3 mt-4 border rounded'
            name="username"
            placeholder='Enter your username or email here'
            value={formData.username}
            onChange={handleChange}
            required
            />
          </div>
          <div>
            <label htmlFor="password" className='font-medium text-sm mb-0.5'>
              Password
            </label>
            <input type="password"
            placeholder='Enter your password here'
            name="password"
            className='w-full border p-3 mt-4 rounded'
            value={formData.password}
            onChange={handleChange}
            required
            />
          </div>
          <div>
            <button type='submit' className='w-full bg-amber-600 p-2 text-white rounded cursor-pointer hover:bg-amber-700 font-semibold transition'>Sign Up</button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">Already have an account?{" "}<Link to="/login" className='hover:text-amber-700'>Login</Link></p>
      </div>
    </div>
    </>
  )
}

export default Signup