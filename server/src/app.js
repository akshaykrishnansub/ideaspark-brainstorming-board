import express from 'express'
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config();

//recreate __dirname is ES modules
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express();
app.use(cors());

const port=process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,'../../client/dist')));

//catch all routes for React
app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../../client/dist','index.html'))
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})