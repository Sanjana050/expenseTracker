const jwt=require('jsonwebtoken');
const User=require('../models/user');


const authenticate=(req,res,next)=>{
    try{

       
const token=req.headers.token;

if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication token missing' });
  }
  else
console.log(token,"TOKEN");

const user=jwt.verify(token,'securityKey');
console.log('user>>>',user.userId,'NEHA');
User.findByPk(user.userId).then((user)=>{
    console.log(JSON.stringify(user));
    req.user=user;
     next();
}).catch((err)=>{
    throw new Error(err)
})
    }
    catch(err)
    {
console.log(err);
return res.status(400).json({success:"false"})
    }
}

module.exports={
    authenticate
}