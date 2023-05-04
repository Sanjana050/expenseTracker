const express=require('express');
const router=express.Router();
const path=require('path');
const userController=require('../controllers/user')
const User=require('../models/user');
const  authenticate  = require('../middleware/auth');



router.get('/getsignup',userController.getSignUp);
router.get('/getlogin',userController.getLogin);

router.post('/postsignup',userController.postSignUp);
router.post('/postlogin',userController.postLogin);

router.get('/postpremium',authenticate.authenticate,userController.postPremiumMembership);
router.post('/updatetransactionstatus',authenticate.authenticate,userController.postTransactionStatus)
router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','welcomepage.html'));
})

module.exports=router;
