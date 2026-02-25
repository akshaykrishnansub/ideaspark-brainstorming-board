import React, { useContext, useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext.jsx';

const Board = () => {

  const {logout}=useContext(AuthContext);

  const {id}=useParams();

  useEffect(()=>{
    if(id){
      fetchBoardData(id);
    }
  },[id])
  
  const [boardSaveSuccess,setBoardSaveSuccess]=useState(''); //success message for board save
  const[boardId,setBoardId]=useState(null); //Initial state of board ID
  const [showModal,setShowModal]=useState(false); //for board modal
  const [boardName,setBoardName]=useState('') // for board name input
  const [savedBoardName,setSavedBoardName]=useState('') //for saving the board's name

  const [showInviteModal,setShowInviteModal]=useState(false); //Initial state for invite Modal
  const [inviteEmail,setInviteEmail]=useState(''); // Initial state for invite mail
  const [inviteSuccessMessage,setInviteSuccessMessage]=useState(''); // Initial state for invite success

  const [showCategoryModal,setShowCategoryModal]=useState(false); //for category modal
  const [categoryName,setCategoryName]=useState(''); //for category name input
  const [savedCategoryName,setSavedCategoryName]=useState([]); //for saving category's name

  const [activeCategoryId,setActiveCategoryId]=useState(null); //current category id
  const [cardInput,setCardInput]=useState(''); //Card Input initial state

  const [editingCardId,setEditingCardId]=useState(null); //initial state for edit card id
  const [editCardContent,setEditCardContent]=useState(""); // initial state for edit card content

  const [editingCategoryId,setEditingCategoryId]=useState(null); //initial state for edit category id
  const [editCategoryName,setEditCategoryName]=useState(""); //initial state for edit categoryName

  const [editingBoard,setEditingBoard]=useState(false);
  const [editBoardTitle,setEditBoardTitle]=useState("");

  const [draggedCard,setDraggedCard]=useState(null);

  const handleSaveBoardName=async()=>{
    if(!boardName.trim()){
      return;
    }
      setShowModal(false); //close the modal
      setBoardName(''); // clear the boardName
      setSavedBoardName(boardName); //set the board name
  }

  //Only save board
  const handleSavedBoard=async()=>{
    if(!savedBoardName.trim()){
      alert("Please enter the board name first");
      return;
    }
    try{
      const res=await fetch('http://localhost:5000/api/boards',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include',
      body: JSON.stringify({title:savedBoardName})
    })
    const data=await res.json();
    if(!res.ok){
      console.error(data.error);
      return;
    }
    setBoardId(data.board.id);
    setBoardSaveSuccess('Board created successfully ✅')
    setTimeout(()=>{
      setBoardSaveSuccess('')
    },2000)
  }catch(err){
    console.error('Error saving board',err);
  }
}

//Code to Save Categories or Add Categories
  const handleSaveCategoryName=async()=>{
    if(!categoryName.trim()){
      return;
    }

    if(!boardId){
      alert('Please create a board first');
      return;
    }

    try{
      const res=await fetch("http://localhost:5000/api/categories",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        credentials:"include",
        body:JSON.stringify({board_id:boardId,name:categoryName})
      })

      const data=await res.json();
      if(!res.ok){
        console.error(data.error)
        return;
      }

      const newCategory={
      id:data.category.id, //temporary frontend ID
      name:data.category.name,
      cards:[] //array for storing cards
    }

    setShowCategoryModal(false); //close the category modal
    setCategoryName(''); // clear the category name
    setSavedCategoryName(prev=>[...prev,newCategory]); // set the category name

    }catch(err){
      console.error("Error creating category",err)
    }
  }

  //function to Add Card
  const handleAddCard=async(categoryId)=>{
    if(!cardInput.trim()){
      return;
    }

    try{
      const res=await fetch(`http://localhost:5000/api/boards/${boardId}/cards`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        credentials:"include",
        body:JSON.stringify({
          category_id:categoryId,
          content:cardInput
        })
      })
      const data=await res.json();
      if(!res.ok){
        console.error(data.error);
        return;
      }

      const newCard={
        id:data.card.id,
        content:data.card.content,
        position:data.card.position
      }

      setSavedCategoryName(prev=>
      prev.map(category=>
        category.id===categoryId
        ?{
          ...category,
          cards:[...category.cards,newCard]
        }
        : category
      )
    );
     setCardInput('');
     setActiveCategoryId(null);

    }catch(err){
      console.error("Error creating card",err)
    }
  }

  //code to fetch board data
  const fetchBoardData=async(boardId)=>{
    try{
      const res=await fetch(`http://localhost:5000/api/boards/${boardId}`,{
        method:'GET',
        credentials:'include'
      })
      const data=await res.json();
      if(!res.ok){
        console.error(data.error);
        return;
      }
      //setting the board title
      setSavedBoardName(data.board.title);
      setBoardId(data.board.id);

      //setting the categories with cards
      setSavedCategoryName(data.categories)
    }catch(err){
      console.error('Error loading boards',err);
    }
  }

  const handleCardDeletion=async(cardId,categoryId)=>{
    const confirmDelete=window.confirm("Are you sure you want to delete this card?");
    if(!confirmDelete){
      return;
    }
    try{
      const res=await fetch(`http://localhost:5000/api/cards/${cardId}`,{
        method:"DELETE",
        credentials:"include"
      }
      )
      const data=await res.json();
      if(!res.ok){
        console.error(data.error);
        return;
      }

      //update the nested state
      setSavedCategoryName(prev=>
        prev.map(category=>
          category.id===categoryId
          ?{
            ...category,
            cards:category.cards.filter(card=>card.id!==cardId)
          }
          :category
        )
      )
    }catch(err){
      console.error("Error deleting card",err);
    }
  }

  const handleCategoryDeletion=async(categoryId)=>{
    const deleteConfirmation=window.confirm("Are you sure that you want to delete this category?");
    if(!deleteConfirmation){
      return;
    }
    try{
      const res=await fetch(`http://localhost:5000/api/categories/${categoryId}`,{
      method:'DELETE',
      credentials:"include"
    })
    const data=await res.json();
    if(!res.ok){
      console.error(data.error);
      return;
    }

    //Remove entire category from the state
    setSavedCategoryName(prev=>
      prev.filter(category=>category.id!==categoryId)
    );
    }catch(err){
      console.error('Error deleting category',err);
    }
  }

  const handleCardUpdate=async(cardId,categoryId)=>{
    if(!editCardContent.trim()){
      return;
    }
    try{
      const res=await fetch(`http://localhost:5000/api/cards/${cardId}`,{
        method:'PUT',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({content:editCardContent})
      })

      const data=await res.json();
      if(!res.ok){
        console.error(data.error);
        return;
      }
      setSavedCategoryName(prev=>
        prev.map(category=>
          category.id===categoryId?{
            ...category,
            cards:category.cards.map(card=>
              card.id===cardId?{...card,content:editCardContent}:
              card
            )
          }
          :category
        )
      )
      setEditingCardId(null);
    }catch(err){
      console.error('Error while updating cards',err);
    }
  }

  const handleCategoryUpdate=async(categoryId)=>{
    if(!editCategoryName.trim()){
      return;
    }
    try{
      const res=await fetch(`http://localhost:5000/api/categories/${categoryId}`,{
        method:'PUT',
        credentials:"include",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({name:editCategoryName})
      })

      const data=await res.json();
      if(!res.ok){
        console.error(data.error);
        return;
      }

      //Update the state
      setSavedCategoryName(prev=>
        prev.map(category=>
          category.id===categoryId?{...category,name:editCategoryName}:
          category
        )
      )
      setEditingCategoryId(null);
      setEditCategoryName("");

    }catch(err){
      console.error('Error in updating category',err);
    }
  }

  const handleUpdateBoard=async()=>{
    if(!editBoardTitle.trim()){
      return;
    }
    try{
      const res=await fetch(`http://localhost:5000/api/boards/${boardId}`,{
        method:'PUT',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title:editBoardTitle})
      })
      const data=await res.json();
      if(!res.ok){
        console.error(data.error);
        return;
      }

      //Update state
      setSavedBoardName(editBoardTitle);
      setEditingBoard(false);
    }catch(err){
      console.error('Error while updating board',err)
    }
  }

  const handleDrop=async(destCategoryId,destIndex)=>{
    if(!draggedCard){
      return;
    }

    const {cardId,sourceCategoryId,sourceIndex}=draggedCard;

    //creating a deep copy
    const newState=JSON.parse(JSON.stringify(savedCategoryName));

    const sourceCategory=newState.find(c=>c.id===sourceCategoryId);
    const destCategory=newState.find(c=>c.id===destCategoryId);

    const movedCard=sourceCategory.cards.find(c=>c.id===cardId);
    sourceCategory.cards=sourceCategory.cards.filter(c=>c.id!==cardId)

    //Adjust index when moving down inside same category
    let adjustedDestIndex=destIndex;

    if(sourceCategoryId===destCategoryId && sourceIndex < destIndex){
      adjustedDestIndex-=1;
    }

    //clamp card safely
    if (adjustedDestIndex < 0) adjustedDestIndex = 0;
    if (adjustedDestIndex > destCategory.cards.length)
      adjustedDestIndex = destCategory.cards.length;

    //Insert card into destination
    destCategory.cards.splice(adjustedDestIndex,0,movedCard);

    //Recalculate the position
    newState.forEach(category=>{
      category.cards.forEach((card,index)=>{
        card.position=index;
      })
    })

    //Update the UI immediately
    setSavedCategoryName(newState);
    setDraggedCard(null);

    //Update DB
    await updatePositionsInDB(newState,sourceCategoryId,destCategoryId)

  }

  const updatePositionsInDB=async(state,sourceCategoryId,destCategoryId)=>{
    const affectedCategories= state.filter(c=>c.id===sourceCategoryId || c.id===destCategoryId);
    const cardsToUpdate=[];
    affectedCategories.forEach(category=>{
      category.cards.forEach(card=>{
        cardsToUpdate.push({
          id:card.id,
          category_id:category.id,
          position:card.position
        })
      })
    })

    try{
      await fetch('http://localhost:5000/api/cards/moveCards',{
        method:"PUT",
        credentials:"include",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({cards:cardsToUpdate})
      })
    }catch(err){
      console.error("Error Updating positions",err)
    }
  }

  const handleInviteMember=async()=>{
    if(!inviteEmail.trim()){
      return;
    }
    try{
      const res=await fetch(`http://localhost:5000/api/boards/${boardId}/invite`,{
        method:'POST',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:inviteEmail})
      })
      const data=await res.json();
      if(!res.ok){
        setInviteSuccessMessage(data.message || 'Error inviting user');
        return;
      }
      setInviteSuccessMessage('User Invited Successfully ✅');
      setInviteEmail("");
      setTimeout(()=>{
        setShowInviteModal(false);
        setInviteSuccessMessage("");
      },1500);
    }catch(err){
      console.error('Error Inviting members',err);
    }
  }

  
  return (
    <>
    <title>IdeaSpark | Boards</title>
    <Navbar
    showLogin={false} showSignup={false}
    rightSlot={
      <>
      <button className='bg-green-600 p-2 rounded hover:bg-green-800' onClick={handleSavedBoard} disabled={!!boardId}>Save Board</button>
      <button className='bg-amber-600 p-2 rounded'onClick={logout}>Logout</button>
      </>
    }
    />
    <div className='flex'>
      <aside className='fixed hidden md:block w-64 bg-blue-950 justify-center px-2 top-16 left-0 h-[calc(100vh-64px)]'>
      <div className='text-white pt-4 px-2 font-bold text-2xl hover:text-amber-600 cursor-pointer' onClick={()=>setShowModal(true)}>Name of the Board</div>
      <div className='text-white font-bold pt-4 px-2 text-2xl'>Category<br/>----------------------</div>
      <div className='text-white px-2 hover:text-amber-600 cursor-pointer' 
      onClick={()=>{
        if(!boardId){
          alert("Please save the board first");
          return;
        }
      setShowCategoryModal(true)}}>Add a Category</div>
      <div className='px-2 pt-6 font-extrabold text-white text-3xl hover:text-amber-700 cursor-pointer' 
      onClick={()=>{
        if(!boardId){
          alert('Please save the board first');
          return;
        }
        setShowInviteModal(true)}}>Invite Members to the board</div>
      </aside>
      <main className='flex-1 text-2xl text-center font-extrabold ml-0 md:ml-64 mb-5'>
        <div className='bg-amber-800 p-3 w-full text-white mb-6 h-14 flex justify-center items-center'>
          {editingBoard?(
            <div className='flex items-center gap-3'>
              <input type="text" className='text-black bg-white p-1' 
              value={editBoardTitle}
              onChange={(e)=>setEditBoardTitle(e.target.value)}
              />
              <button className='bg-green-700 p-1 rounded' onClick={handleUpdateBoard}>Save Changes</button>
              <button className='bg-red-700 p-1 rounded' onClick={()=>{setEditingBoard(false);setEditBoardTitle(savedBoardName);}}>Cancel</button>
            </div>
          ):(
            <div className='flex items-center gap-3'>
              {savedBoardName || 'No board created yet'}
              {savedBoardName &&(
                <button className='cursor-pointer' title="Edit This Board Name" onClick={()=>{setEditingBoard(true);setEditBoardTitle(savedBoardName)}}>✏️</button>
              )}
            </div>
          )}
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 items-start mb-6">
          {boardSaveSuccess &&(
          <div className='bg-green-400 text-white text-sm mb-4 inline-block'>
            {boardSaveSuccess}
          </div>
          )}
          {savedCategoryName.length===0?(
              <p className='text-black text-2xl'>No Categories added yet.</p>
          ):(
            savedCategoryName.map(category=>(
              <div
              key={category.id}
              className='bg-blue-500 text-white px-6 py-4 rounded shadow-lg w-full border hover:border-amber-600'
              >
                <div className='flex justify-between items-center'>
                {editingCategoryId===category.id?(
                  <div>
                    <textarea className='bg-white text-black' value={editCategoryName} onChange={(e)=>{setEditCategoryName(e.target.value)}} />
                    <div className='flex gap-3 mt-3'>
                      <button className='bg-green-500 font-normal p-1' onClick={()=>handleCategoryUpdate(category.id)}>Save Changes</button>
                      <button className='bg-red-600 font-normal p-1' onClick={()=>{setEditingCategoryId(null);setEditCategoryName("")}}>Cancel</button>
                    </div>
                  </div>
                ):(
                  <div className='flex justify-between w-full'>
                    <h3 className='text-3xl font-extrabold'>{category.name}</h3>
                    <div>
                      <button className='cursor-pointer' title='Edit this Category' onClick={()=>{setEditingCategoryId(category.id);setEditCategoryName(category.name)}}>✏️</button>
                      <button className='text-red-600 font-bold cursor-pointer' title='Delete This Category' onClick={()=>handleCategoryDeletion(category.id)}>X</button>
                    </div>
                  </div>
                )}
                </div>
                <div className='mt-4 space-y-2'>
                  <div onDragOver={(e)=>e.preventDefault()}
                  onDrop={()=>handleDrop(category.id,0)}
                  className='h-3'
                    ></div>
                  {category.cards.map((card,index)=>(
                    <div key={card.id}>
                      <div draggable
                      onDragStart={()=>{
                        setDraggedCard({
                          cardId:card.id,
                          sourceCategoryId:category.id,
                          sourceIndex:index
                        })
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        const rect=e.currentTarget.getBoundingClientRect();
                        const dropPosition=e.clientY-rect.top; //Move Y inside the card
                        let insertIndex=dropPosition<rect.height/2?index:index+1;
                        handleDrop(category.id,insertIndex)
                      }
                      }
                      className='bg-blue-300 border p-2 font-normal flex justify-between items-center cursor-move'>
                      {editingCardId===card.id?(
                       <>
                       <div>
                        <textarea className='text-black bg-white p-1 w-full' value={editCardContent} onChange={(e)=>setEditCardContent(e.target.value)}/>
                          <div className='flex gap-3 mt-3'>
                            <button className='bg-green-800 p-2 rounded-lg'onClick={()=>handleCardUpdate(card.id,category.id)}>Save Changes</button>
                            <button className='bg-red-700 p-2 rounded-lg' onClick={()=>{setEditingCardId(null);setEditCardContent("");}}>Cancel</button>
                          </div>
                       </div>
                       </> 
                      ):(
                        <div className='flex justify-between w-full'>
                          {card.content}
                          <div>
                            <button className='cursor-pointer' title='Edit this Card' onClick={()=>{setEditingCardId(card.id);setEditCardContent(card.content)}}>✏️</button>
                            <button className='font-bold cursor-pointer' title='Delete This Card' onClick={()=>handleCardDeletion(card.id,category.id)}>🗑</button>
                          </div>
                        </div>
                      )}
                      </div>
                    </div>
                    ))}
                    <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(category.id, category.cards.length)}
                    className='h-4'></div>
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
        <input type="text" className='w-full p-2 mt-4 border' value={boardName} onChange={(e)=>setBoardName(e.target.value)} name='title'/>
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
        <input type="text" className='w-full p-2 rounded mt-4 border' name='name' value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}} />
        <div className='flex gap-4 justify-center'>
          <button className='bg-blue-500 p-2 mt-4 rounded' onClick={handleSaveCategoryName}>Add Category</button>
          <button className='bg-red-500 p-2 mt-4 rounded' onClick={()=>setShowCategoryModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  ):null}

  {showInviteModal && (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-white w-96 p-5'>
        <h1 className='text-2xl font-medium text-center'>Invite User</h1>
        <input type="email" className='w-full p-3 mt-4 border rounded' placeholder='Enter invite email here' value={inviteEmail} 
        onChange={(e)=>setInviteEmail(e.target.value)}/>
        {inviteSuccessMessage && (
          <div className="mt-3 text-sm text-center text-green-600">
            {inviteSuccessMessage}
          </div>
        )}
        <div className='flex justify-center gap-4 mt-4'>
          <button className='bg-green-600 p-2 text-white font-medium' onClick={handleInviteMember}>Invite</button>
          <button className='bg-red-600 p-2 text-white font-medium' onClick={()=>{setShowInviteModal(false);setInviteEmail("");setInviteSuccessMessage("")}}>Cancel</button>
        </div>
      </div>
    </div>
  )}
    </>
  )
}

export default Board