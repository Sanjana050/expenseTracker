const jwt=require('jsonwebtoken');
const User=require('../models/user');


const authenticate=(req,res,next)=>{
    try{
 console.log("In authenticate")
 console.log("REQUEST",req.body,"REQUEST ENDS")
console.log(req.body.expenseId,"expenseId");
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
    req.expenseId=req.body.expenseId;



    console.log("NEHA")
    console.log(user)
    console.log("user id",req.user.id)
    console.log("NEHA")
    console.log(req.user.dataValues.isPremiumUser,"premiumUser from Data")
    console.log(req.user.dataValues.email,"email now")
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