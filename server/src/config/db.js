import pg from 'pg';
import dotenv from 'dotenv'

if(process.env.NODE_ENV!=="production"){
    dotenv.config();
}

const db=new pg.Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    ssl:{ rejectUnauthorized: false }
});
db.connect()
.then(client=>{console.log("Connected to postgres")
    client.release()
})
.catch(err=>console.log("Connection error",err))

export default db;
