async function userData(){
    const resp = await fetch("http://localhost:8000/getuser",{
        method:"GET",
        credentials: "include"
    });
    const data = await resp.json();
    // console.log(data);
    try {
     if(resp.status!==200)
     {window.location.href="http://localhost:5502/FrontEnd/SignIn/signin.html"}
     const userName = document.getElementById("username")
     const userEmail = document.getElementById("email")
     const userBio = document.getElementById("userbio")
     userName.innerText=data.userData.username;
     userEmail.innerText=data.userData.email;
     userBio.innerText=data.userData.bio;
    } catch (error) {
         console.log(error.message)
         window.location.href="http://localhost:5502/FrontEnd/SignIn/signin.html"
    }
 } 

 userData()