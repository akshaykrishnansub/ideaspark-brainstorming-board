import db from '../config/db.js'

const insertBoard=async(owner_id,title)=>{
    const result=await db.query('INSERT into boards(owner_id,title) VALUES($1,$2) returning *',[owner_id,title]);
    return result.rows[0];
}

export default insertBoard