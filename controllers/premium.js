const User=require('../models/user');
const Expense=require('../models/expense');

const Sequelize=require('sequelize');
const sequelize=require('../util/database');


exports.showLeaderBoard= async(req,res,next)=>{
try{
const users=await User.findAll();
const expenses=await Expense.findAll();

const UserAgExpense={};
expenses.forEach((expense)=>{
    if(UserAgExpense[expense.userId]){
        UserAgExpense[expense.userId]+=expense.amount;
    }
    else{
        UserAgExpense[expense.userId]=expense.amount;
    }
})

var userLeaderBoard=[];
await users.forEach((user)=>{
    userLeaderBoard.push({name:user.name,totalExpense:UserAgExpense[user.id]})
})
console.log(userLeaderBoard)
console.log(UserAgExpense);
console.log('sending')

const myArr=Object.entries(userLeaderBoard);
 myArr.sort((a,b)=>{
     a[1]-b[1];
})

console.log(myArr)

res.status(200).json(myArr)
}
catch(err){

}
}