import db from '../config/db.js'

const findCardsByCategoryId=async(category_id)=>{
    const result=await db.query('SELECT * from cards where category_id=$1 ORDER BY position',[category_id]);
    return result.rows
}

const insertCard=async(board_id,category_id,content,position)=>{
    const result=await db.query('INSERT into cards (board_id,category_id,content,position) VALUES($1,$2,$3,$4) returning *',[board_id,category_id,content,position]);
    return result.rows[0];
}

const calculateMaxPositionByCategory=async(category_id)=>{
    const result=await db.query('SELECT COALESCE(MAX(position),0) as max from cards where category_id=$1',[category_id]);
    return result.rows[0].max;
}

export {insertCard,calculateMaxPositionByCategory,findCardsByCategoryId}