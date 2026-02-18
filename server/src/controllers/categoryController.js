import {deleteCategoryById, findCategoryById, insertCategory} from "../models/categoryModel.js";
import { findBoardByBoardIdAndOwnerId } from "../models/boardModel.js";
import { deleteCardsByCategoryId } from "../models/cardModel.js";

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

const deleteCategory=async(req,res)=>{
    try{
        const owner_id=req.user.id;
        const category_id=req.params.id;

        const category=await findCategoryById(category_id);
        if(!category){
            return res.status(404).json({error:'Category not found'});
        }

        const board=await findBoardByBoardIdAndOwnerId(category.board_id,owner_id);
        if(!board){
            return res.status(403).json({error:'Unauthorised'});
        }

        //Delete cards inside a category
        await deleteCardsByCategoryId(category_id);

        //Delete Category
        await deleteCategoryById(category_id);
        res.json({message:'Category deleted successfully'});

    }catch(err){
        console.error(err);
        res.status(500).json({error:'Error deleting category'})
    }
}

export {createCategory,deleteCategory}