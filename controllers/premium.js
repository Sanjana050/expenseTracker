const User=require('../models/user');
const Expense=require('../models/expense');


const fs=require('fs');
const AWS=require('aws-sdk')

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
    // attributes: [
    //   'id',
    //   'name',
    //   [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'totalExpense']
    // ],
    // include: [
    //   {
    //     model: Expense,
    //     attributes: []
    //   }
    // ],
    // group: ['User.id'],
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

 function uploadToS3(data,fileName){
  const BUCKET_NAME='expensetrackerapp5';
  const IAM_USER_KEY='AKIAS2QFH63ORT4UBLEI';
  const IAM_USER_SECRET='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';
  
let s3bucket=new AWS.S3({
  accessKeyId:IAM_USER_KEY,
  secretAccessKey:IAM_USER_SECRET,
  
})

var params={
  Bucket:BUCKET_NAME,
  Key:`${fileName}`,
  Body:data,
  ACL:'public-read'
}
return new Promise((resolve,reject)=>{
  s3bucket.upload(params,(err,s3response)=>{
    if(err)
    {
      console.log("NJjjdnw",err);
      reject(err);
    }
    else{
      console.log('success',s3response)
      resolve(s3response.Location);
      }
  });
  
})
 

}
exports.downloadExpense=async(req,res,next)=>{
  try{
  if(req.user.isPremiumUser===false)
  {
    res.status(500).json({"message":"not a premium user"});
  }
  console.log("NeHA",req.user);
  
  const expenses=await Expense.findAll({where:{userId:req.user.id}})
  
    
  console.log(expenses);
  const stringexpense=JSON.stringify(expenses);
  const userId=req.user.id;
  const fileName=`Expense${userId}/${new Date()}.txt`;
  const fileUrl=await uploadToS3(stringexpense,fileName);
  res.status(200).json({fileUrl,'success':true})
}
catch(err){
  console.log(err);
  res.status(500).json({fileUrl:'',success:false,'err':err})
}

    
   

}

    
 
  


