const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const user= jwt.verify(token,process.env.TOKEN);
        if(!user)res.send('Invalid token');
        else{
            req.verifiedUser=user; 
            next();
        }
    } catch (error) {
        throw new Error('You Need a Token');
    }
}


module.exports=auth;