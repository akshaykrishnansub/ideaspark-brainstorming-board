import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <>
    <Navbar showLogin={false} showSignup={false} />
    <div className='px-2 bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className="bg-white p-8 w-full max-w-md rounded-xl shadow-lg">
        <h2 className='text-2xl font-bold text-center'>Create an Account for Free</h2>
        <p className='text-center p-2'>No credit card required</p>
        <form className='space-y-4'>
          <div>
            <label htmlFor="username" className='text-sm font-medium mb-0.5'>
              Username/Email
            </label>
            <input type="text"
            className='w-full p-3 mt-4 border rounded'
            name="username"
            placeholder='Enter your username or email here'
            />
          </div>
          <div>
            <label htmlFor="password" className='font-medium text-sm mb-0.5'>
              Password
            </label>
            <input type="password"
            placeholder='Enter your password here'
            className='w-full border p-3 mt-4 rounded'
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