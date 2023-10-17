const userData = async() =>{
    try {
     const resp = await fetch("http://localhost:8000/getuser",{
         method:"GET",
         credentials:"include"
     });
     if(resp.status!==200){window.location.href="../SignIn/signin.html"}
     const {data} = await resp.json();
     const userName = document.getElementsById("username")
     const userEmail = document.getElementsById("useremail")
     const userBio = document.getElementsById("userbio")
     userName.innerText=data.username;
     userEmail.innerText=data.email;
     userBio.innerText=data.bio
    } catch (error) {
         console.log(error.message)
         window.location.href="../SignIn/signin.html"
    }
 } 

 userData()