const User=require('../models/user');
const Expense=require('../models/expense');

const Sequelize=require('sequelize');
const sequelize=require('../util/database');


exports.showLeaderBoard= async(req,res,next)=>{
try{
console.log('before leaderboard')
// const leaderBoardArray=await User.findAll({attributes:['id','name', [sequelize.fn('sum', sequelize.col('Expense.amount')), 'totalExpense']],
// include:[{
//     model:Expense,
//     attributes:[]
// }],

// group:[User.id],
// order:[['totalExpense',"DESC"]]
// });

const leaderBoardArray = await User.findAll({
    attributes: [
      'id',
      'name',
      [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'totalExpense']
    ],
    include: [
      {
        model: Expense,
        attributes: []
      }
    ],
    group: ['User.id'],
    order: [['totalExpense', 'DESC']]
  });
  

console.log('after leaderboard')

console.log("users neha",leaderBoardArray)
// const UserAgExpense = await Expense.findAll({
//     attributes: [
//       [sequelize.fn('sum', sequelize.col('amount')), 'totalExpense']
//     ],
//     group: ['userId']
//   });
  
// console.log(expenses)
// const UserAgExpense={};
// expenses.forEach((expense)=>{
//     if(UserAgExpense[expense.userId]){
//         UserAgExpense[expense.userId]+=expense.amount;
//     }
//     else{
//         UserAgExpense[expense.userId]=expense.amount;
//     }
// })



// var userLeaderBoard=[];
// await users.forEach((user)=>{
//     userLeaderBoard.push({name:user.name,totalExpense:UserAgExpense[user.id]})
// })


// console.log(userLeaderBoard)
// console.log(UserAgExpense);
// console.log('sending')

// const myArr=Object.entries(userLeaderBoard);
//  myArr.sort((a,b)=>{
//      a[1]-b[1];
// })

// console.log(myArr)

res.status(200).json(leaderBoardArray)
}
catch(err){
console.log(err);
}
}