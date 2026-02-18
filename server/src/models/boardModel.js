import db from '../config/db.js'

const findBoardsByOwnerId=async(owner_id)=>{
    const result=await db.query('SELECT * from boards where owner_id=$1 ORDER BY id DESC',[owner_id]);
    return result.rows
}

const findBoardByBoardIdAndOwnerId=async(id,owner_id)=>{
    const result=await db.query('SELECT * from boards where id=$1 AND owner_id=$2',[id,owner_id]);
    return result.rows[0];
}

const insertBoard=async(owner_id,title)=>{
    const result=await db.query('INSERT into boards(owner_id,title) VALUES($1,$2) returning *',[owner_id,title]);
    return result.rows[0];
}

const deleteBoardById=async(board_id)=>{
    const result=await db.query('DELETE from boards where id=$1 returning *',[board_id])
    return result.rows[0];
}

export {insertBoard,findBoardByBoardIdAndOwnerId,findBoardsByOwnerId,deleteBoardById}