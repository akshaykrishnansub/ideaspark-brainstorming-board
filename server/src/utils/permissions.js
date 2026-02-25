import { findBoardById,findCollaborator } from "../models/boardModel.js";

const canEditBoard=async(board_id,userId)=>{
    const board=await findBoardById(board_id);
    if(!board){
        return false;
    }
    if(board.owner_id===userId){
        return true;
    }
    const isCollaborator=await findCollaborator(board_id,userId);
    return !!isCollaborator;
}

export {canEditBoard}