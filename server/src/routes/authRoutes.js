import {Router} from 'express'
import {registerUser,login,logout} from '../controllers/authController.js'
import authenticateToken from '../middleware/authMiddleware.js'

const router=Router();

router.post('/register',registerUser);
router.post('/login',login);
router.post('/logout',logout)

//protected route
router.get('/me',authenticateToken,(req,res)=>{
    res.json({
        authenticated:true,
        user:req.user
    });
});

export default router;