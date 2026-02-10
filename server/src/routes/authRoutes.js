import {Router} from 'express'
import {registerUser,login} from '../controllers/authController.js'
import authenticateToken from '../middleware/authMiddleware.js'

const router=Router();

router.post('/register',registerUser);
router.post('/login',login);

//protected route
router.get('/me',authenticateToken,(req,res)=>{
    res.json({
        authenticated:true,
        user:req.user
    });
});

export default router;