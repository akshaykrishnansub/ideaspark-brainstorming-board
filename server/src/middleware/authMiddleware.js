import jwt from 'jsonwebtoken';

const authenticateToken=(req,res,next)=>{
    const token=req.cookies.token;

    if(!token)
        return res.status(401).json({error:'Access Denied'});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded
        next();
    }catch(err){
        res.status(403).json({error:'Invalid Token'})
    }
}

export default authenticateToken