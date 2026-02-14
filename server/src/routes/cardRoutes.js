import {Router} from 'express'
import { createCard } from '../controllers/cardController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router=Router();

router.post("/",authenticateToken,createCard);

export default router