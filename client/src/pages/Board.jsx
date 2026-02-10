import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext.jsx';

const Board = () => {

  const {logout}=useContext(AuthContext);

  const [showModal,setShowModal]=useState(false); //for board modal
  const [boardName,setBoardName]=useState('') // for board name input
  const [savedBoardName,setSavedBoardName]=useState('') //for saving the board's name

  const [showCategoryModal,setShowCategoryModal]=useState(false); //for category modal
  const [categoryName,setCategoryName]=useState(''); //for category name input
  const [savedCategoryName,setSavedCategoryName]=useState([]); //for saving category's name

  const [activeCategoryId,setActiveCategoryId]=useState(null); //current category id
  const [cardInput,setCardInput]=useState(''); //


  const handleSaveBoardName=()=>{
    if(!boardName.trim()){
      return;
    }
    setShowModal(false); //close the modal
    setBoardName(''); // clear the boardName
    setSavedBoardName(boardName); // set the board name
  }

  const handleSaveCategoryName=()=>{
    if(!categoryName.trim()){
      return;
    }

    const newCategory={
      id:Date.now(), //temporary frontend ID
      name:categoryName,
      cards:[] //array for storing cards
    }

    setShowCategoryModal(false); //close the category modal
    setCategoryName(''); // clear the category name
    setSavedCategoryName(prev=>[...prev,newCategory]); // set the category name
  }

  const handleAddCard=(categoryId)=>{
    if(!cardInput.trim()){
      return;
    }
    setSavedCategoryName(prev=>
      prev.map(category=>
        category.id===categoryId
        ?{
          ...category,
          cards:[...category.cards,cardInput]
        }
        : category
      ),
      setCardInput(''),
      setActiveCategoryId(null)
    )
  }

  return (
    <>
    <title>IdeaSpark | Boards</title>
    <Navbar
    showLogin={false} showSignup={false}
    rightSlot={
      <>
      <button className='bg-green-600 p-2 rounded'>Save Board</button>
      <button className='bg-amber-600 p-2 rounded'onClick={logout}>Logout</button>
      </>
    }
    />
  <div className='flex'>
      <aside className='w-64 bg-blue-950 min-h-screen'>
      <div className='text-white pt-4 px-2 font-bold text-2xl hover:text-amber-600 cursor-pointer' onClick={()=>setShowModal(true)}>Name of the Board</div>
      <div className='text-white font-bold pt-4 px-2 text-2xl'>Category<br/>----------------------</div>
      <div className='text-white px-2 hover:text-amber-600 cursor-pointer' onClick={()=>setShowCategoryModal(true)}>Add a Category</div>
      <div className='px-2 pt-6 font-extrabold text-white text-3xl'>Invite Members to the board</div>
      </aside>
      <main className='flex-1 bg-blue-900 h-14 text-2xl text-center p-2 text-white font-extrabold'>
        {savedBoardName || 'No board created yet'}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {savedCategoryName.length===0?(
              <p className='text-black text-2xl'>No Categories added yet.</p>
          ):(
            savedCategoryName.map(category=>(
              <div
              key={category.id}
              className='bg-blue-500 text-white px-6 py-4 rounded shadow-lg w-96'
              >
                <h3 className='text-3xl font-extrabold'>{category.name}</h3>

                <div className='mt-4 space-y-2'>
                  {category.cards.map((card,index)=>(
                    <div key={index} className='bg-blue-300 border p-2 font-normal'>
                      {card}
                    </div>
                  ))}
                </div>

                {activeCategoryId!==category.id&&(
                  <button className='bg-amber-600 rounded p-2 mt-6 hover:bg-amber-700' onClick={()=>setActiveCategoryId(category.id)}>+ Add An Idea</button>
                )}
                {activeCategoryId===category.id &&(
                  <div>
                    <textarea type='text' className='bg-white text-black mt-6 font-normal w-full' value={cardInput} onChange={(e)=>setCardInput(e.target.value)}/>
                    <div className='flex gap-2.5'>
                      <button className='bg-orange-600 p-2 mt-4' onClick={()=>handleAddCard(category.id)}>Add Idea</button>
                      <button className='bg-red-600 p-2 mt-4' onClick={()=>{setActiveCategoryId(null),setCardInput('')}}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
  </div>
  {showModal?(
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white w-100 p-10 border rounded-lg mb-4'>
        <label htmlFor="boardName" className='text-center font-bold'>Enter the name of the board here:</label>
        <input type="text" className='w-full p-2 mt-4 border' value={boardName} onChange={(e)=>setBoardName(e.target.value)} />
        <div className='flex gap-2'>
          <button className='bg-blue-500 p-2 mt-4 text-white rounded' onClick={handleSaveBoardName}>Add Name</button>
          <button className='bg-red-700 p-2 mt-4 text-white rounded' onClick={()=>setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  ):null}
  
  {showCategoryModal ? (
    <div className='bg-black/55 backdrop-blur-sm fixed inset-0 flex justify-center items-center'>
      <div className='bg-white w-96 p-6 text-center'>
        <label htmlFor="categoryName" className='font-bold'>Add your Category Here:</label>
        <input type="text" className='w-full p-2 rounded mt-4 border' value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}} />
        <div className='flex gap-4 justify-center'>
          <button className='bg-blue-500 p-2 mt-4 rounded' onClick={handleSaveCategoryName}>Add Category</button>
          <button className='bg-red-500 p-2 mt-4 rounded' onClick={()=>setShowCategoryModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  ):null}
    </>
  )
}

export default Board