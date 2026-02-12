import {insertBoard} from "../models/boardModel.js";

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

export {createBoard}