import db from '../config/db.js'

const insertCategory=async(board_id,name)=>{
    const result=await db.query('INSERT into categories (board_id,name) VALUES($1,$2) returning *',[board_id,name]);
    return result.rows[0];
}

export default insertCategory