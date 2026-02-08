import db from '../config/db.js'


const findUserByMail=async(username)=>{
    const result=await db.query('select * from users WHERE username=$1',[username]);
    return result.rows[0];
}

const createUser=async(username,password)=>{
    const result=await db.query('INSERT into users (username,password) values($1,$2) returning *',[username,password]);
    return result.rows[0];
}

export {createUser,findUserByMail}