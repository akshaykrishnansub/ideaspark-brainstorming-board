import {Router} from 'express'
import {registerUser,login,logout,getProfile} from '../controllers/authController.js'
import authenticateToken from '../middleware/authMiddleware.js'

const router=Router();

router.post('/register',registerUser);
router.post('/login',login);
router.post('/logout',logout)

//protected route
router.get('/me',authenticateToken,getProfile);

export default router;