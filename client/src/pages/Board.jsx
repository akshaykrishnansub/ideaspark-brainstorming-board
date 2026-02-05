import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Board = () => {
  const [showModal,setShowModal]=useState(false); //for modal
  const [boardName,setBoardName]=useState('') // for board name input
  const [savedBoardName,setSavedBoardName]=useState('') //for saving the board's name

  const handleSaveBoardName=()=>{
    if(!boardName.trim()){
      return;
    }
    setShowModal(false); //close the modal
    setBoardName(''); // clear the boardName
    setSavedBoardName(boardName); // set the board name
  }

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
  <div className='flex'>
      <aside className='w-64 bg-blue-950 min-h-screen'>
      <div className='text-white pt-4 px-2 font-bold text-2xl hover:text-amber-600 cursor-pointer' onClick={()=>setShowModal(true)}>Name of the Board</div>
      <div className='text-white font-bold pt-4 px-2 text-2xl'>Category<br/>----------------------</div>
      <div className='text-white px-2 hover:text-amber-600 cursor-pointer'>Add a Category</div>
      <div className='px-2 pt-6 font-extrabold text-white text-3xl'>Invite Members to the board</div>
      </aside>
      <main className='flex-1'>
        <p>Hello</p>
      </main>
  </div>
  {showModal?(
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white w-100 p-10 border rounded-lg mb-4'>
        <label htmlFor="boardName" className='text-center font-bold'>Enter the name of the board here:</label>
        <input type="text" className='w-full p-2 mt-4 border' value={boardName} />
        <div className='flex gap-2'>
          <button className='bg-blue-500 p-2 mt-4 text-white'>Add Name</button>
          <button className='bg-red-700 p-2 mt-4 text-white' onClick={()=>setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  ):null}
    </>
  )
}

export default Board