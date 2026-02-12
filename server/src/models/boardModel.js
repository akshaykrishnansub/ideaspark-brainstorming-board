import db from '../config/db.js'

const findBoardByBoardIdAndOwnerId=async(id,owner_id)=>{
    const result=await db.query('SELECT * from boards where id=$1 AND owner_id=$2',[id,owner_id]);
    return result.rows[0];
}

const insertBoard=async(owner_id,title)=>{
    const result=await db.query('INSERT into boards(owner_id,title) VALUES($1,$2) returning *',[owner_id,title]);
    return result.rows[0];
}

export {insertBoard,findBoardByBoardIdAndOwnerId}