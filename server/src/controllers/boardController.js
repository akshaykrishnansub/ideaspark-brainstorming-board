import {insertBoard,findBoardByBoardIdAndOwnerId,findBoardsByOwnerId, deleteBoardById, updateBoardById, findBoardById, findUserByEmail, findCollaborator, addCollaborator,findBoardsSharedWithUser} from "../models/boardModel.js";
import { deleteCategoryByBoardId, findCategoriesByBoardId } from "../models/categoryModel.js";
import { deleteCardsByBoardId, findCardsByCategoryId } from "../models/cardModel.js";

const createBoard=async(req,res)=>{
    try{
        const {title}=req.body;
        const owner_id=req.user.id; //from JWT
        const newBoard=await insertBoard(owner_id,title);
        return res.status(201).json({message:'Board saved successfully',board:newBoard})

    }catch(err){
        console.error(err);
        return res.status(500).json({error:'Failed to save board'});
    }
}

const getBoards=async(req,res)=>{
    try{
        const userId=req.user.id;
        const ownedBoards=await findBoardsByOwnerId(userId);
        const sharedBoards=await findBoardsSharedWithUser(userId);
        res.json({owned:ownedBoards,shared:sharedBoards});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Error fetching boards'});
    }
}

const getBoardById=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {board_id}=req.params;
        const board=await findBoardById(board_id);
        if(!board){
            return res.status(404).json({error:'Board not found'})
        }

        //Allow access if owner or collaborator
        if(board.owner_id!==userId){
            const isCollaborator=await findCollaborator(board_id,userId);
            if(!isCollaborator){
                return res.status(403).json({error:'Unauthorized'});
            }
        }
        const categories=await findCategoriesByBoardId(board_id);
        for(let category of categories){
            category.cards=await findCardsByCategoryId(category.id);
        }
        res.json({board,categories});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Error loading board'})
    }
}

const deleteBoard=async(req,res)=>{
    try{
        const owner_id=req.user.id;
        const board_id=req.params.id;

        const board=await findBoardByBoardIdAndOwnerId(board_id,owner_id);
        if(!board){
            return res.status(403).json({error:'Unauthorised'})
        }

        //Delete card first
        await deleteCardsByBoardId(board_id);

        //Delete category
        await deleteCategoryByBoardId(board_id);

        //Delete Board
        await deleteBoardById(board_id);
        res.json({message:'Board Deleted successfully'})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Error deleting board'});
    }
}

const updateBoard=async(req,res)=>{
    try{
        const owner_id=req.user.id;
        const board_id=req.params.id;
        const {title}=req.body;

        if(!title.trim()){
            return res.status(400).json({error:'Board title required'});
        }

        const updatedBoard=await updateBoardById(board_id,title,owner_id);

        if(!updatedBoard){
            return res.status(403).json({error:'Unauthorized or Board not found'})
        }

        res.json({message:'Board Updated successfully',board:updatedBoard});

    }catch(err){
        console.error(err);
        res.status(500).json({error:'Error Updating Board'})
    }
}

const inviteUser=async(req,res)=>{
    const {board_id}=req.params;
    const {email}=req.body;
    const currentUserId=req.user.id;
    try{
        //check if board exists
        const board=await findBoardById(board_id);
        if(!board){
            return res.status(404).json({error:'Board not found'});
        }

        //only owner can invite
        if(board.owner_id!==currentUserId){
            return res.status(403).json({error:'Only owner can invite users'});
        }

        //find user by Email
        const user=await findUserByEmail(email);
        if(!user){
            return res.status(404).json({error:'User not found'});
        }

        //Preventing duplicate invites
        const alreadyCollaborator=await findCollaborator(board_id,user.id);
        if(alreadyCollaborator){
            return res.status(400).json({error:'User already added'});
        }

        //adding collaborator
        await addCollaborator(board_id,user.id);
        res.json({message:'User Invited successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Server error'})
    }
}

export {createBoard,getBoards,getBoardById,deleteBoard,updateBoard,inviteUser}