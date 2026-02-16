import { insertCard,calculateMaxPositionByCategory } from "../models/cardModel.js";
import { findBoardByBoardIdAndOwnerId } from "../models/boardModel.js";
import { findCategoryByIdAndBoardId } from "../models/categoryModel.js";

const createCard=async(req,res)=>{
    try{
        const owner_id=req.user.id;
        const board_id=req.params.board_id;
        const {category_id,content}=req.body;

        //Basic validation
        if(!board_id||!category_id||!content){
            return res.status(400).json({error:'All fields required'})
        }

        //check board ownership
        const board=await findBoardByBoardIdAndOwnerId(board_id,owner_id);
        if(!board){
            return res.status(403).json({error:'Unauthorized board access'});
        }

        //check category belongs to board
        const category=await findCategoryByIdAndBoardId(category_id,board_id);
        if(!category){
            return res.status(403).json({error:'Invalid category for board'})
        }

        //calculate position
        const maxPosition=await calculateMaxPositionByCategory(category_id);
        const position=maxPosition+1

        //Insert card
        const card=await insertCard(board_id,category_id,content,position);

        res.status(201).json({message:'Card inserted successfully',card})

    }catch(err){
        console.error(err);
        res.status(500).json({error:'Error creating card'});
    }
}

export {createCard}