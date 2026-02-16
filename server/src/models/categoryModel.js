import db from '../config/db.js'

const findCategoriesByBoardId=async(board_id)=>{
    const result=await db.query('SELECT * from categories where board_id=$1 order by id DESC',[board_id]);
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

export {insertCategory,findCategoryByIdAndBoardId,findCategoriesByBoardId}