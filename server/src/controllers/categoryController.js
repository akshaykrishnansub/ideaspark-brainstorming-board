import {deleteCategoryById, findCategoryById, insertCategory, updateCategoryById} from "../models/categoryModel.js";
import { findBoardByBoardIdAndOwnerId } from "../models/boardModel.js";
import { deleteCardsByCategoryId } from "../models/cardModel.js";
import { canEditBoard } from "../utils/permissions.js";

const createCategory=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {board_id,name}=req.body;
        if(!board_id||!name){
            return res.status(400).json({error:'Board ID and category name are required'})
        }

        //verify if board belongs to logged in user
        const isAllowed=await canEditBoard(board_id,userId);
        if(!isAllowed){
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
        const userId=req.user.id;
        const category_id=req.params.id;

        const category=await findCategoryById(category_id);
        if(!category){
            return res.status(404).json({error:'Category not found'});
        }

        const isAllowed=await canEditBoard(category.board_id,userId);
        if(!isAllowed){
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

const updateCategory=async(req,res)=>{
    try{
        const userId=req.user.id;
        const category_id=req.params.id;
        const {name}=req.body;
        if(!name.trim()){
            return res.status(400).json({error:'Category name is required'});
        }

        const category=await findCategoryById(category_id);
        if(!category){
            return res.status(404).json({error:'Category not found'})
        }

        const isAllowed=await canEditBoard(category.board_id,userId);
        if(!isAllowed){
            return res.status(403).json({error:'Unauthorized'});
        }

        const updatedCategory=await updateCategoryById(category_id,name);
        res.json({
            message:'Category updated successfully',
            category:updatedCategory
        })

    }catch(err){
        console.error(err);
        res.status(500).json({error:'Error while updating category'});
    }


}

export {createCategory,deleteCategory,updateCategory}