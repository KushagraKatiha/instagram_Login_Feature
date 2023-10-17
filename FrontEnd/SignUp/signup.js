const signUp = document.getElementById("signup-btn")

signUp.addEventListener("click", ()=>{
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
    name,
    username,
    email,
    password,
    confirmPassword,
    bio
}

register(userData)

})


const register = async (userData) => {
    try{
        const res = await fetch("http://localhost:8000/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/javascript"
            },
            body: JSON.stringify(userData)
        })

        const data = await res.json();
        console.log(data)
        window.location.href = "../SignIn/signin.html"
    }catch(error){
        console.log(error.message);
    }
}


