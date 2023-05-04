
const expenselist=document.querySelector('.expenselist')
const expenseform=document.querySelector('.expense-form')
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');


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
        console.log(response,"from postpremium");
        var options={
            "key":response.data.key_id,
            "orderId":response.data.order.id,
            "handler":async function(response){
                await axios.post('http://localhost:80/updatetransactionstatus',{
                    order_id:options.orderId,
                    payment_id:response.razorpay_payment_id,
            },{headers:{"token":token}})
            alert('you are a premium user now')
        }
    
            
                }
                const rzp1= new Razorpay(options);
                rzp1.open();
                e.preventDefault();

          const failed=   await   rzp1.on('payment failed',function(response){
                    console.log(response)
                })
if(!failed)
{
  document.querySelector('#premium-btn').parentElement.remove();
}
            
                


            
        
    
    }
    catch(err)
    {
        console.log(err)
    }
}

document.querySelector('#premium-btn').addEventListener('click',premium);


document.addEventListener("DOMContentLoaded",loadexpense);

expenseform.addEventListener('submit',expense)



