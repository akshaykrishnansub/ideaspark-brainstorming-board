import {insertBoard,findBoardByBoardIdAndOwnerId,findBoardsByOwnerId, deleteBoardById} from "../models/boardModel.js";
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
        const owner_id=req.user.id;
        const boards=await findBoardsByOwnerId(owner_id)
        res.json({boards});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Error fetching boards'});
    }
}

const getBoardById=async(req,res)=>{
    try{
        const owner_id=req.user.id;
        const {board_id}=req.params;
        const board=await findBoardByBoardIdAndOwnerId(board_id,owner_id);
        if(!board){
            return res.status(404).json({error:'Board not found'})
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

export {createBoard,getBoards,getBoardById,deleteBoard}