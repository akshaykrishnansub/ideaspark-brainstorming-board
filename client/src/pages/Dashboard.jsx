import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../src/context/AuthContext.jsx'
import Avatar from '../components/Avatar.jsx'

const Dashboard = () => {

  const {logout}=useContext(AuthContext)
  const {profile}=useContext(AuthContext)
  const navigate=useNavigate();
  const [toast,setToast]=useState(null);
  const [sidebarOpen,setSidebarOpen]=useState(false);

  //Global function to show messages
  const showToast=(message,type="success")=>{
    setToast({message,type});
    setTimeout(()=>{
      setToast(null);
    },3000);
  }

  useEffect(()=>{
    fetchBoards();
  },[])
  //creating state for displaying boards from database
  const [displayOwnedBoards,setDisplayOwnedBoards]=useState([]);
  const [displaySharedBoards,setDisplaySharedBoards]=useState([]);

  const fetchBoards=async()=>{
    try{
      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/boards`,{
        method:"GET",
        credentials:"include"
      })

      const data=await res.json();
      setDisplayOwnedBoards(data.owned);
      setDisplaySharedBoards(data.shared);

    }catch(err){
      console.error(err);
      showToast("Server error. Please try again ❌", "error");
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
      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/boards/${boardId}`,{
        method:'DELETE',
        credentials:'include'
      })
      const data=await res.json();
      if(!res.ok){
        console.error(data.error);
        return;
      }

      setDisplayOwnedBoards(prevBoards=>
        prevBoards.filter(board=>board.id!==boardId)
      )

      showToast('Board Deleted Successfully ✅','success');

    }catch(err){
      console.error(err);
      showToast("Server error. Please try again ❌", "error");
    }
  }

  return (
    <>
    <title>IdeaSpark | Dashboard</title>
    <Navbar
    showLogin={false}
    showSignup={false}
    profile={profile}
    leftSlot={
      <button className='md:hidden text-white p-2 ml-auto' onClick={()=>setSidebarOpen(true)}>☰</button>
    }
    rightSlot={
    <button className='bg-amber-600 p-2 rounded hover:bg-amber-700 transition-colors' onClick={logout}>Logout</button>
    }/>
    <div className="flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}/>
        )}
      <aside className={`fixed w-64 bg-blue-950 justify-center px-2 top-0 left-0 h-screen lg:h-[calc(100vh-64px)] transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:top-16`}>
        <button className="lg:hidden text-white text-right w-full cursor-pointer" onClick={() => setSidebarOpen(false)}>✖</button>
        <div className='text-white text-3xl pt-2 font-bold text-center'>MENU</div>
        <div className='text-white pt-3 text-2xl font-bold text-center'><Link to='/boards'>Create New Board</Link></div>
      </aside>
      <main className='p-2 flex-1 ml-0 md:ml-64'>
        {toast && (
          <div className='fixed top-6 right-6 z-50 animate-slide-in'>
            <div className={`text-white px-4 py-2 rounded-lg shadow-lg
            ${toast.type==="success"?"bg-green-400":"bg-red-400"}`}>
              {toast.message}
            </div>
          </div>
          )}
        <h1 className='text-3xl text-center pb-4 font-bold mt-16'>My Boards</h1>
        {displayOwnedBoards.length===0?<p className='text-center mb-3'>No Owned Boards to display</p>:(
          displayOwnedBoards.map((board)=>(
            <div key={board.id} onClick={()=>openBoard(board.id)} className='p-4 bg-blue-500 mb-3 text-white rounded cursor-pointer hover:bg-blue-600 h-14 grid'>
              <div className='flex justify-between'>
                {board.title}
                <button className='bg-red-500 p-1 hover:bg-red-600 rounded-sm cursor-pointer' onClick={(e)=>{e.stopPropagation();handleBoardDeletion(board.id)}}>Delete</button>
              </div>
            </div>
          ))
        )}
        <h1 className='text-3xl text-center pb-4 font-bold'>Shared with Me</h1>
        {displaySharedBoards.length===0?<p className='text-center'>No Shared boards</p>
        :(
          displaySharedBoards.map((board)=>(
            <div key={board.id}
            onClick={()=>openBoard(board.id)}
            className='p-4 bg-green-500 mb-3 text-white rounded cursor-pointer hover:bg-green-600 h-14 grid'>
              {board.title}
            </div>
          ))
        )}
      </main>
    </div>  
    </>
  )
}

export default Dashboard