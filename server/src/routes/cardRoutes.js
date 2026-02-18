import {Router} from 'express'
import { createCard, deleteCard } from '../controllers/cardController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router=Router();

router.post("/",authenticateToken,createCard);
router.delete("/:id",authenticateToken,deleteCard);

export default router