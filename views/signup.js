

const messageElement=document.querySelector('#message')

async function signup(e){
    try{

    

        e.preventDefault();
    
        const name=document.querySelector('#name').value;
        const email=document.querySelector('#email').value;
        const password=document.querySelector('#password').value;
        const phone=document.querySelector('#phone').value;


        
        const response=await axios.post('http://localhost:3000/postsignup', 
            {name,email,password,phone});

    

          
          
if(response.status==200)
{


location.href = './loginpage.html?message=User added successfully!';

        }

           
           
            
        
          
        }
catch(err){

    console.log(err);
           
    const errorMessage = err.response.data.message;
    console.log(errorMessage)
    const div=document.createElement('div');
    
    div.style.color="red";
    div.appendChild(document.createTextNode(`${errorMessage}!!!   login instead`));
    const button=document.createElement('button');

    const link = document.createElement('a');
link.href = "./loginpage.html";
link.appendChild(document.createTextNode('Login'));
    link.className="btn"


    div.appendChild(link);
    messageElement.append(div);


}
}
document.querySelector('.formcontrol').addEventListener('submit',signup);
