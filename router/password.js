const express=require('express');
const router=express.Router();

const forgotPasswordController=require('../controllers/password');
const  authenticate = require('../middleware/auth');

router.post('/forgotPassword',forgotPasswordController.forgotpassword)
router.get('/resetpassword/:id',forgotPasswordController.resetPassword)
router.get('/updatePass/:id',forgotPasswordController.updatePass)
module.exports=router;