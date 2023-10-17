const signUp = document.getElementById("signup-btn")

signUp.addEventListener("click", (event)=>{
    // event.preventDefault();

    const name = document.getElementById("name").value
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const bio = document.getElementById("bio").value


if(!name || !username || !email || !password || !confirmPassword || !bio){
    alert("All the fields are required")
    return
}

const userData ={
    name : name,
    username : username,
    email : email,
    password : password,
    confirmPassword : confirmPassword ,
    bio : bio
}

register(userData)

})


async function register(userData) {
    try{
        const res = await fetch("http://localhost:8000/signup",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(userData)
        })

        window.location.href = "../SignIn/signin.html"
    }catch(error){
        console.log(error.message);
    }
}


