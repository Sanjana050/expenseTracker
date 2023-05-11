

const expenseController=require('../controllers/expense');
const Expense=require('../models/expense');
const authenticate=require('../middleware/auth')
const express=require('express');
const router=express.Router();

router.get('/getexpense',authenticate.authenticate,expenseController.getExpense);

router.get('/getAllExpense',expenseController.getAllExpense)

router.post('/postexpense',authenticate.authenticate,expenseController.postExpense);
router.post('/deleteExpense',authenticate.authenticate,expenseController.deleteExpense)
module.exports=router;