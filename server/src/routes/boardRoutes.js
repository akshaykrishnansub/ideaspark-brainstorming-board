import {Router} from 'express'
import authenticateToken from '../middleware/authMiddleware.js';
import { createBoard } from '../controllers/boardController.js';

const router=Router();

router.post('/',authenticateToken,createBoard);

export default router;