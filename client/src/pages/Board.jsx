import React from 'react'
import Navbar from '../components/Navbar'

const Board = () => {
  return (
    <>
    <title>IdeaSpark | Boards</title>
    <Navbar
    showLogin={false} showSignup={false}
    rightSlot={
      <>
      <button className='bg-green-600 p-2 rounded'>Save Board</button>
      <button className='bg-amber-600 p-2 rounded'>Logout</button>
      </>
    }
    />
    <aside className='w-64 bg-blue-950 min-h-screen'>
      <div className='text-white pt-4 px-2 font-bold text-2xl'>Name of the Board</div>
      <div className='text-white font-bold pt-4 px-2 text-2xl'>Category<br/>----------------------</div>
      <div className='text-white px-2 hover:text-amber-600 cursor-pointer'>Add a Category</div>
      <div className='px-2 pt-6 font-extrabold text-white text-3xl'>Invite Members to the board</div>
    </aside>
    </>
  )
}

export default Board