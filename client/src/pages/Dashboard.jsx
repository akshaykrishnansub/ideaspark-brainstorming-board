import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../src/context/AuthContext.jsx'

const Dashboard = () => {

  const {logout}=useContext(AuthContext)
  const navigate=useNavigate();

  useEffect(()=>{
    fetchBoards();
  },[])
  //creating state for displaying boards from database
  const [displayBoards,setDisplayBoards]=useState([]);

  const fetchBoards=async()=>{
    try{
      const res=await fetch('http://localhost:5000/api/boards',{
        method:"GET",
        credentials:"include"
      })

      const data=await res.json();
      setDisplayBoards(data.boards);

    }catch(err){
      console.error('Error while fetching boards',err);
    }
  }

  //open each board on clicking it
  const openBoard=(id)=>{
    navigate(`/boards/${id}`)
  }

  const handleBoardDeletion=async(boardId)=>{
    const deleteBoardConfirm=window.confirm('Are you sure you want to delete this board??');
    if(!deleteBoardConfirm){
      return;
    }
    try{
      const res=await fetch(`http://localhost:5000/api/boards/${boardId}`,{
        method:'DELETE',
        credentials:'include'
      })
      const data=await res.json();
      if(!res.ok){
        console.error(data.error);
        return;
      }

      setDisplayBoards(prevBoards=>
        prevBoards.filter(board=>board.id!==boardId)
      )

    }catch(err){
      console.error('Error deleting board',err);
    }
  }

  return (
    <>
    <title>IdeaSpark | Dashboard</title>
    <Navbar
    showLogin={false}
    showSignup={false}
    rightSlot={
    <button className='bg-amber-600 p-2 rounded hover:bg-amber-700 transition-colors' onClick={logout}>Logout</button>
    }/>
    <div className="flex min-h-screen">
      <aside className='bg-blue-950 w-64 justify-center px-2'>
        <div className='text-white text-2xl pt-2 font-bold'>MENU</div>
        <div className='text-white pt-3 font-bold'><Link to='/boards'>Create New Board</Link></div>
        <div className='text-white pt-3 font-bold'>My Profile</div>
      </aside>
      <main className='p-2 flex-1'>
        <h1 className='text-3xl text-center pb-4 font-bold'>List of My Boards</h1>
        {displayBoards.length===0?(<p>No Boards to display</p>):(
          displayBoards.map((board)=>(
            <div key={board.id} onClick={()=>openBoard(board.id)} className='p-4 bg-blue-500 mb-3 text-white rounded cursor-pointer hover:bg-blue-600 h-14 grid'>
              <div className='flex justify-between'>
                {board.title}
                <button className='bg-red-500 p-1 hover:bg-red-600 rounded-sm cursor-pointer' onClick={(e)=>{e.stopPropagation();handleBoardDeletion(board.id)}}>Delete</button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>  
    </>
  )
}

export default Dashboard