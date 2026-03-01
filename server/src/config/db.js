import pg from 'pg';
import dotenv from 'dotenv'

if(process.env.NODE_ENV!=="production"){
    dotenv.config();
}

const db=new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{ rejectUnauthorized: false }
});
db.connect()
.then(client=>{console.log("Connected to postgres")
    client.release()
})
.catch(err=>console.log("Connection error",err))

export default db;
