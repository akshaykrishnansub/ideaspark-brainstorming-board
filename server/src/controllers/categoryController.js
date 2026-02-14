import {insertCategory} from "../models/categoryModel.js";
import { findBoardByBoardIdAndOwnerId } from "../models/boardModel.js";

const createCategory=async(req,res)=>{
    try{
        const owner_id=req.user.id;
        const {board_id,name}=req.body;
        if(!board_id||!name){
            return res.status(400).json({error:'Board ID and category name are required'})
        }

        //verify if board belongs to logged in user
        const board=await findBoardByBoardIdAndOwnerId(board_id,owner_id);
        if(!board){
            return res.status(403).json({error:'Unauthorized access to board'});
        }

        //create category
        const category=await insertCategory(board_id,name);

        res.status(201).json({
            message:'Category created successfully',
            category
        })



    }catch(err){
        console.error(err);
        res.status(500).json({error:'Server error while creating category'})
    }
}

export {createCategory}