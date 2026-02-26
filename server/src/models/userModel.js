import db from '../config/db.js'


const findUserByMail=async(username)=>{
    const result=await db.query('select * from users WHERE username=$1',[username]);
    return result.rows[0];
}

const createUser=async(username,password_hash)=>{
    const result=await db.query('INSERT into users (username,password_hash) values($1,$2) returning *',[username,password_hash]);
    return result.rows[0];
}

const findUserById=async(id)=>{
    const result=await db.query('SELECT id,username FROM users WHERE id=$1',[id]);
    return result.rows[0];
}

export {createUser,findUserByMail,findUserById}