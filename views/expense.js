

const expenselist=document.querySelector('.expenselist')
const expenseform=document.querySelector('.expense-form')
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

let status1="";

async function expense(e){

    try{
e.preventDefault();

const amount=document.querySelector('#amount').value;
const description=document.querySelector('#description').value;
const category=document.querySelector('#category').value;





const response=await axios.post('http://localhost:80/postexpense',{amount,description,category},{headers:{"token":token}});
if(response.status===200)
{
const div=document.createElement('div');
div.setAttribute("id", `expense-${response.data.id}`);
div.appendChild(document.createTextNode(`amount:  ${amount}     description:  ${description}     category:  ${category}`));
div.style.backgroundColor="lightgrey";

div.style.color="black";
div.style.width="50rem"


const button=document.createElement('button');
button.className="btn";

button.style.backgroundColor="red"
button.appendChild(document.createTextNode("Delete"));
button.style.float="right"
div.appendChild(button);

expenselist.appendChild(div);

button.addEventListener('click', (event)=>deleteElement(response.data.id,event));
}
else{
    const div=document.createElement('div');
    div.appendChild(document.createTextNode(`response.data.message`));
    div.style.backgroundColor="lightgrey";
    div.style.color="black";
    div.style.width="50rem";
    div.style.padding="2rem";
    expenselist.appendChild(div);
    
    
    }

    document.querySelector('#amount').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#category').value = '';
    document.querySelector('.expense-form').reset();


}

catch(err)
{
    console.log(err)
}
}








function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}         






async function deleteElement(id,button)
{
    try{

        
    const div=button.target.parentElement;
    

    const response=await axios.delete(`/deleteExpense/${id}`)
    if(response.status===200)
    {
       
        div.remove();
    }
    
    }
    catch(err){
       
            console.log(err)
        
    }


}
async function loadexpense() {
    try {
      
        console.log(token)
        
       
        let res=await  axios.get('http://localhost:80/postlogintoken',{headers:{"token":token}})

        console.log(res,"response is axis");
          if(res.data.isPremiumUser===true){
          console.log(res,"res");
           document.querySelector('#premium-btn').style.visibility="hidden";
           document.querySelector('#message').innerHTML="you are a premium user now"
          }



       const signUpId=localStorage.getItem('signupId')
       const decodedToken=parseJwt(signUpId);
       
       

      const response = await axios.get('http://localhost:80/getAllExpense',{headers:{"token":token}});
      if (response.status === 200) {
        expenselist.innerHTML = '';
        const expenses = response.data.expense;

        for (let expense of expenses) {
          const amount = expense.amount;
          const description = expense.description;
          const category = expense.category;
          const id = expense.id;
  
          const div = document.createElement('div');
          div.id = `expense-${id}`;
          div.appendChild(document.createTextNode(`amount: ${amount} description: ${description} category: ${category}`));
          div.style.backgroundColor = "lightgrey";
          div.style.color = "black";
          div.style.width = "50rem";
  
          const button = document.createElement('button');
          button.className = "btn";
          button.style.backgroundColor = "red";
          button.appendChild(document.createTextNode("Delete"));
          button.style.float = "right";
          div.appendChild(button);
  
          expenselist.appendChild(div);
  
          button.addEventListener('click', (e) => deleteElement(id, e));
          
         
        }
      } else {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(response.data.message));
        div.style.backgroundColor = "lightgrey";
        div.style.color = "black";
        div.style.width = "50rem";
        div.style.padding = "2rem";
        expenselist.appendChild(div);
      }
    } catch (err) {
      console.log(err);
    }

  }
  
  async function premium(e){
    try{

        const token=localStorage.getItem('signupId');
        console.log('from local storage',token)
        let response=await axios.get('http://localhost:80/postpremium',{headers:{"token":token}})
        console.log(response,"from postpremium",response.data.userId);
        var options={
            "key":response.data.key_id,
            "orderId":response.data.order.id,
            "handler":async function(response){
                await axios.post('http://localhost:80/updatetransactionstatus',{
                    order_id:options.orderId,
                    payment_id:response.razorpay_payment_id,
            },{headers:{"token":token}})
            alert('you are a premium user now')
            console.log('preimum user')
            document.querySelector('#premium-btn').style.visibility="hidden";
            document.querySelector('#message').innerHTML="you are a premium user now"


           
            
       
     
     }
    }
                console.log("after var options",options.handler)
                const rzp1= new Razorpay(options);
                rzp1.open();
                e.preventDefault();

          const failed=   await   rzp1.on('payment failed', async function(response){
            
            console.log(response);
            try{
              status1="failed";
await axios.post('http://localhost:80/postFailedStatus',{ order_id:options.orderId,
payment_id:response.razorpay_payment_id,

},{headers:{"token":token}})
            }
            catch(err)
            {
console.log(err)
            }
                   
                   
                })
         
              
    }
    catch(err)
    {
        console.log(err)
    }
}

async function loadleaders(){

  document.querySelector('.premiumleaderbtn').style.visibility="hidden";
  document.querySelector('.leaders').style.visibility="visible";
  console.log("in leaderborad button")
const token=localStorage.getItem("signUpId");
const leaderBoardArray=await axios.get('http://localhost:80/showLeaderBoard',{headers:{"token":token}});


var leaderBoardElem=document.querySelector('.premium_users');

leaderBoardArray.data.forEach((element)=>{
  
  const id = element.id;
  const name=element.name;
  const totalExpense=element.totalExpense;
  
  const expense = totalExpense !== null ? totalExpense : 0;
    leaderBoardElem.innerHTML += `<li><span class="name">Name:</span><span class="username">${name}</span><span class="expense">total_expense:</span><span class="expenseamount">${expense}</span></li>`;
  
  
})
document.querySelector('.premium_users').style.visibility="visible"

}






document.querySelector('#premium-btn').addEventListener('click',premium);
window.addEventListener("DOMContentLoaded",loadexpense);
expenseform.addEventListener('submit',expense);
document.querySelector('.premiumleaderbtn').addEventListener('click',loadleaders)


