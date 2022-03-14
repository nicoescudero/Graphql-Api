const jwt=require('jsonwebtoken');

module.exports=async(user)=>{
    return await jwt.sign(user,process.env.TOKEN,{expiresIn: '1h'});
};