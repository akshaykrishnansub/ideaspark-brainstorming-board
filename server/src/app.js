import express from 'express'
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url'
import './config/db.js'
import authRoutes from './routes/authRoutes.js'
import boardRoutes from './routes/boardRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cardRoutes from './routes/cardRoutes.js'
import cookieParser from 'cookie-parser'


//recreate __dirname is ES modules
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express();
const allowedOrigins=[
    "http://localhost:5173",
    "https://ideaspark-frontend.vercel.app"
]
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}
));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'../../client/dist')));

app.use('/api',authRoutes)
app.use('/api/boards',boardRoutes)
app.use('/api/categories',categoryRoutes)
app.use('/api/cards',cardRoutes)

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0] });
  } catch (err) {
    console.error("DB test failed:", err);
    res.status(500).json({ connected: false, error: "DB connection failed" });
  }
});


export default app;