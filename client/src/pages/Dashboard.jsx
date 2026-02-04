import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <title>IdeaSpark | Dashboard</title>
    <Navbar
    showLogin={false}
    showSignup={false}
    rightSlot={
    <button className='bg-amber-600 p-2 rounded hover:bg-amber-700 transition-colors'>Logout</button>
    }/>
    <div className="flex">
      <aside className='bg-blue-950 w-64 h-screen justify-center px-2 min-h-screen'>
        <div className='text-black pt-2 font-bold'>MENU</div>
        <div className='text-white pt-3 font-bold'><Link to='/boards'>Create New Board</Link></div>
        <div className='text-white pt-3 font-bold'>My Profile</div>
      </aside>
      <main className='p-2 flex-1 overflow-y-auto'>
        
      </main>
    </div>  
    </>
  )
}

export default Dashboard