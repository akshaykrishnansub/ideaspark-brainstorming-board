import {Router} from 'express'
import { createCard, deleteCard, updateCard,moveCards } from '../controllers/cardController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router=Router();

router.post("/",authenticateToken,createCard);
router.put("/moveCards",authenticateToken,moveCards)
router.delete("/:id",authenticateToken,deleteCard);
router.put("/:id",authenticateToken,updateCard)

export default router