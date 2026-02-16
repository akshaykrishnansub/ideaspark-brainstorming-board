import {Router} from 'express'
import authenticateToken from '../middleware/authMiddleware.js';
import { createBoard, getBoards, getBoardById } from '../controllers/boardController.js';
import {createCard} from '../controllers/cardController.js'

const router=Router();

router.post('/',authenticateToken,createBoard);
router.get("/",authenticateToken,getBoards);
router.get("/:board_id",authenticateToken,getBoardById);
router.post("/:board_id/cards",authenticateToken,createCard)

export default router;