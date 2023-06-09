const path=require('path');
const User=require('../models/user')
const bcrypt=require('bcrypt')
const saltRounds=10;
const jwt=require('jsonwebtoken')
const razorpay=require('razorpay')
const  Order=require('../models/orders')




const secret ='securityKey';

function generateAccessKeytoken(id,isPremiumUser){
return jwt.sign({userId:id,isPremiumUser},'securityKey')
}

exports.getSignUp=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','signuppage.html'))
}

exports.getLogin=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','loginpage.html'));

}
exports.postSignUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
  
  
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
        
          res.status(401).json({message:"user already exists"})
          
          
        } else {

          bcrypt.hash(password,saltRounds,async (err,hash)=>{
try{

        const result=  await  User.create({
              name: name,
              email: email,
              password: hash,
              phone: phone,
            })
              if(result)  {
                console.log("user added");
                res.status(200).json({message:"user added successfully",userId:result.id})
  
              }
            }
              catch(err) {
                console.log(err);
                res
                  .status(500)
                  .json({ message: "user cannot be added, error occured", error: err });
              }
          })
        }
        }).catch((err) => {
        res.status(500).json({ message: "error occured while finding user" });
      });
  };
  

exports.postLoginToken=(req,res,next)=>{
 const user=req.user;
 
 console.log(req.user.isPremiumUser,"from exports .post loginToken");
 res.json({"isPremiumUser":req.user.isPremiumUser});


}

  exports.postLogin = (req, res, next) => {
    console.log('hi')
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password,"from post login in user.js")
    

    User.findOne({ where: { email: email } })
      .then((user) => {
// console.log(user);
        if(user) {
          
         
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: "Internal server error" });
            } else {
              
               
                res.status(200).json({ message: "Login successful",userId:generateAccessKeytoken(user.id,user.isPremiumUser)});
              
            }
          });
        } 
        else {
        
         
          res.status(401).json({ message: "User not found" });
        }
      })
      .catch((err) => {

        console.log(err);
        res.status(500).json({ message: "Internal server error" ,err:err});
      });
  };
  

  exports.postPremiumMembership=async(req,res,next)=>{
    try {
      const token = req.headers.token;
      console.log("token:",token)
      if (!token) {
        throw new Error('Authentication failed. No token provided.');
      }
  
      console.log('before error')
      const decodedToken = jwt.verify(token, secret);
      console.log(decodedToken,"decoded")
      const userId = decodedToken.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      console.log('before error 2')
var rzp=new razorpay({
  key_id:'rzp_test_eRZn0TsQicWQW2',
  key_secret:'9PcDrIS3yCjdSTbYWJg5JUq3'
})
console.log(rzp);

console.log('after rzp')
const amount=1000;
rzp.orders.create({amount ,currency:'INR'},(err,order)=>{
  if(err)
  {
    console.log(err);
  }
  else{
    console.log("ORDERS",order,"order")
  }
  req.user.createOrder({orderId:order.id,status:'PENDING'}).then(()=>{
    return res.status(200).json({order,key_id:rzp.key_id,userId})
  }).catch((err)=>{
    console.log('before error 3')
    throw new Error(json.stringify(err))
  })
})
    }
    catch(err){
console.log(err);
res.status(400).json({message:'error occured',err:err})
    }

  }

  exports.postTransactionStatus= async (req,res,next)=>{
    try{
      const {payment_id,order_id}=req.body;
      
      console.log(req.body,'---->this is req.body from user.js post Tranx')
      const order=await Order.findOne({where:{orderId:order_id}})
    
       
     const promise1=  order.update({paymentId:payment_id,status:"Successful"});

         const promise2=  req.user.update({isPremiumUser:true});
Promise.all([promise1,promise2]).then(()=>{
  res.status(200).json({success:"true",message:"transaction status updated"});
}).catch((err)=>{
  console.log(err);
  res.json({message:'error occured',err:err})
})
            
         
          
        

    }
    catch(err)
    {
      console.log(err);
      await postFailedStatus(req.body.payment_id, req.body.order_id);
      res.status(401).json({message:'something went wrong',err:err})
    }
  }


  exports.postFailedStatus=async (req,res,next)=>{
try{
const {payment_id,order_id}=req.body;
console.log('this is from post payment status failed');
const order=await Order.findByPk(order_id);
if(!order)
{
  console.log(order);
  return res.status(400).json({message:"order not found"})
}
const updatedOrder=await order.update({
  paymentId:payment_id,
  status:"Failed"
  

})
res.status(200).json({ success: true, message: "transaction status updated" });

}
catch{
  console.log(err);
    res.status(401).json({ message: 'something went wrong', err: err })

}
  }


  