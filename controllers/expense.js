const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Expense=require('../models/expense');

const jwt = require('jsonwebtoken');




const secret = 'securityKey';

// decode the token to get the encrypted id

exports.getExpense=(req,res,next)=>{
    Expense.findAll({where:{id:req.user.id}}).then(expense=>{
        res.json({expense:expense})
    }).catch((err)=>{
        res.json('cannot get expense')
    })
}


exports.postExpense=(req,res,next)=>{

    const token = req.headers.token;
    
    const decoded = jwt.verify(token, secret);
    
    const  amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    const id=decoded.userId;
    
 
    Expense.create({
        amount:amount,
        description:description,
        category:category,
        userId:id
        
    
    }).then((result)=>{
        
        res.status(200).json({message:'expense addeded',id:result.id,token:token,decoded:decoded})
    }).catch((err)=>{
        res.status(400).json({message:"expense could not be added",err:err})
    })


}

exports.getAllExpense=(req,res,next)=>{
    const token = req.headers.token;
    console.log('in getAllExpense backend',token)
    const decoded = jwt.verify(token, secret);
    
    console.log(decoded.userId,'decoded')
    Expense.findAll({where:{userId:decoded.userId}}).then(expense=>{
    console.log(expense)
        res.json({expense:expense,id:decoded.userId})
    }).catch((err)=>{
        res.json('cannot get expense')
    })
}

exports.deleteExpense=(req,res,next)=>{
    const id=req.params.id;
    Expense.findByPk(id).then(expense=>{
       expense.destroy();
       res.status(200);
    }).catch((err)=>{
        res.json('cannot get expense')
        res.status(500);
    })
}