import { Router } from 'express'
import authenticateToken from '../middleware/authMiddleware.js';
import { createCategory, deleteCategory, updateCategory } from '../controllers/categoryController.js';

const router=Router();

router.post('/',authenticateToken,createCategory);
router.delete('/:id',authenticateToken,deleteCategory)
router.put("/:id",authenticateToken,updateCategory)

export default router;