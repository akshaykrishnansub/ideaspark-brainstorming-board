import db from '../config/db.js'

const findCategoriesByBoardId=async(board_id)=>{
    const result=await db.query('SELECT * from categories where board_id=$1',[board_id]);
    return result.rows
}

const insertCategory=async(board_id,name)=>{
    const result=await db.query('INSERT into categories (board_id,name) VALUES($1,$2) returning *',[board_id,name]);
    return result.rows[0];
}

const findCategoryByIdAndBoardId=async(id,board_id)=>{
    const result=await db.query('SELECT * from categories where id=$1 and board_id=$2',[id,board_id]);
    return result.rows[0]
}

//find category by ID
const findCategoryById=async(category_id)=>{
    const result=await db.query('SELECT * from categories where id=$1',[category_id]);
    return result.rows[0];
}

//delete category by ID
const deleteCategoryById=async(category_id)=>{
    const result=await db.query('DELETE from categories where id=$1 returning *',[category_id]);
    return result.rows[0]
}

//delete category by board ID
const deleteCategoryByBoardId=async(board_id)=>{
    const result=await db.query('DELETE from categories where board_id=$1 returning *',[board_id]);
    return result.rows
}

//Update category
const updateCategoryById=async(category_id,name)=>{
    const result=await db.query('UPDATE from categories SET name=$1 WHERE id=$2 returning *',[name,category_id]);
    return result.rows[0];
}

export {insertCategory,findCategoryByIdAndBoardId,findCategoriesByBoardId,findCategoryById,deleteCategoryById,deleteCategoryByBoardId,updateCategoryById}