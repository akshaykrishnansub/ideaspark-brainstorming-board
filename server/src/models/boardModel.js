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

const updateBoardById=async(board_id,title,owner_id)=>{
    const result=await db.query('UPDATE boards SET title=$1,updatedAt=CURRENT_TIMESTAMP WHERE id=$2 and owner_id=$3 returning *',[title,board_id,owner_id]);
    return result.rows[0]
}

//Get Boards only by ID (without owner check)
const findBoardById=async(board_id)=>{
    const result=await db.query('SELECT * from boards WHERE id=$1',[board_id])
    return result.rows[0];
}

//find user by Email
const findUserByEmail=async(email)=>{
    const result=await db.query('SELECT * from users where username=$1',[email]);
    return result.rows[0];
}

//check if collaborator exists
const findCollaborator=async(board_id,user_id)=>{
    const result=await db.query('SELECT 1 from board_users WHERE board_id=$1 AND user_id=$2',[board_id,user_id]);
    return result.rows.length>0;
}

const addCollaborator=async(board_id,user_id)=>{
    const result=await db.query('INSERT into board_users(board_id,user_id) VALUES($1,$2) RETURNING *',[board_id,user_id]);
    return result.rows[0];
}

const findBoardsSharedWithUser=async(user_id)=>{
    const result=await db.query('SELECT b.* FROM boards b INNER JOIN board_users bu ON b.id=bu.board_id WHERE bu.user_id=$1 ORDER BY b.id DESC',[user_id]);
    return result.rows
}

const deleteBoardUsersByBoardId=async(board_id)=>{
    const result=await db.query('DELETE from board_users where board_id=$1 RETURNING *',[board_id])
    return result.rows;
}
export {insertBoard,findBoardByBoardIdAndOwnerId,findBoardsByOwnerId,deleteBoardById,updateBoardById,findBoardById,findUserByEmail,findCollaborator,addCollaborator,findBoardsSharedWithUser,deleteBoardUsersByBoardId}