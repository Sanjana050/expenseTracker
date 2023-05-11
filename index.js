const Sib=require('sib-api-v3-sdk');
require('dotenv').config();
const client=Sib.ApiClient.instance;
const apiKey=client.authentications['api-key'];
apiKey.apiKey=process.env.API_KEY;

const tranEmailApi=new Sib.TransactionalEmailsApi();
const sender={
    email:`sanjanamondal419@gmail.com`
}

const receivers=[
    {
        email:`sanjanamondal711@gmail.com`
    }
]

tranEmailApi.sendTransacEmail({
    sender,
    to:receivers,
    Subject:'Reset Password',
    textContent:`
    You can reset your password using this link {{params.role}}`,
    params:{
        role:'flerglerg'
    }
}).then(()=>{
    console.log("successfull")
}).catch((err)=>{
    console.log(err)
})