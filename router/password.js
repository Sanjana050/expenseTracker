const express=require('express');
const router=express.Router();

const forgotPasswordController=require('../controllers/password');
const  authenticate = require('../middleware/auth');

router.post('/forgotPassword',forgotPasswordController.forgotpassword)

module.exports=router;