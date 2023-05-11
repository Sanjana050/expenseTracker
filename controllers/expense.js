const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Expense=require('../models/expense');

const jwt = require('jsonwebtoken');
const User=require('../models/user')




const secret = 'securityKey';

// decode the token to get the encrypted id

exports.getExpense=(req,res,next)=>{
    Expense.findAll({where:{id:req.user.id}}).then(expense=>{
        res.json({expense:expense})
    }).catch((err)=>{
        res.json('cannot get expense')
    })
}


// exports.postExpense=async (req,res,next)=>{


//     console.log('in postExpense')
//     const t=await sequelize.transaction();
//     const token = req.headers.token;
    
//     const decoded = jwt.verify(token, secret);
    
//     const  amount=req.body.amount;
//     const description=req.body.description;
//     const category=req.body.category;
//     const id=req.user.id;
//     console.log(amount,description,category,id,"jchjefcj")

//  console.log('SANJANANANAN')

//  try{
//     Expense.create({

 
//         amount:amount,
//         description:description,
//         category:category,
//         userId:id


        
    
//     },{transaction:t}).then(async(result)=>{
//         console.log(result);
//         const total_expense=  Number(amount)+Number(req.user.totalExpense);
//         console.log('SANJANA')
//         User.update({totalExpense:total_expense},{where:{id:req.user.id}},{transaction:t}).then(async()=>{
//     await t.commit();
//             res.status(200).json({message:'expense addeded',id:result.id,token:token,decoded:decoded})
//         }).catch(async(err)=>{
//            await t.rollback();
//             res.status(500).json({message:err,success:false})
//         })
       
//     }).catch(async(err)=>{
// await t.rollback();

//         res.status(400).json({message:"expense could not be added",err:err})
//     })
// }
// catch(err)
// {

// }


exports.postExpense = async (req, res, next) => {
    console.log('in postExpense');
    const t = await sequelize.transaction();
    const token = req.headers.token;
    const decoded = jwt.verify(token, secret);
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const id = req.user.id;
  
    console.log(amount, description, category, id, 'jchjefcj');
  
    console.log('SANJANANANAN');
  
    try {
      const expense = await Expense.create({
        amount: amount,
        description: description,
        category: category,
        userId: id
      }, { transaction: t });
  
      const totalExpense = Number(amount) + Number(req.user.totalExpense);
  
      await User.update({ totalExpense: totalExpense }, {
        where: { id: req.user.id },
        transaction: t
      });
  
      await t.commit();
      res.status(200).json({
        message: 'expense added',
        id: expense.id,
        token: token,
        decoded: decoded
      });
  
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(500).json({
        message: "expense could not be added",
        error: error
      });
    }
  };
  

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

exports.deleteExpense=async(req,res,next)=>{
    console.log("USER",req.user.id,req.expenseId)
    const id=req.expenseId;
    const t=await sequelize.transaction();
   
    Expense.findByPk(id).then(async(expense)=>{
        console.log("HII REQ@ ",expense)

        const totalExpense=req.user.totalExpense-expense.amount;
        console.log(totalExpense);
        User.update({totalExpense:totalExpense},{where:{id:req.user.id}},{transaction:t}).then(async()=>{
           await expense.destroy();
           await t.commit();
            res.status(200).json({message:"expense deleted successfully"});
        }).catch(async(err)=>{
            await t.rollback();
res.status(500).json({message:"error",err:err})
        })
       
    }).catch(async(err)=>{
       await t.rollback();
        res.status(500).json({message:"expense not found",err:err});
    })
}