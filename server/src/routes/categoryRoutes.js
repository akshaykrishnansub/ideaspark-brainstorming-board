import { Router } from 'express'
import authenticateToken from '../middleware/authMiddleware.js';
import { createCategory } from '../controllers/categoryController.js';

const router=Router();

router.post('/',authenticateToken,createCategory);

export default router;