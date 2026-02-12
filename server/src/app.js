import express from 'express'
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url'
import './config/db.js'
import authRoutes from './routes/authRoutes.js'
import boardRoutes from './routes/boardRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cookieParser from 'cookie-parser'


//recreate __dirname is ES modules
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}
));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const port=process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,'../../client/dist')));

app.use('/api',authRoutes)
app.use('/api/boards',boardRoutes)
app.use('/api/categories',categoryRoutes)

//catch all routes for React
app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../../client/dist','index.html'))
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})