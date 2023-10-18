const formSubmit = document.getElementById("submit")

    formSubmit.addEventListener("click",(event) => {
      event.preventDefault();
      
      const userName = document.getElementById("username").value
      const userPassword = document.getElementById("password").value
      const userData = {
        username:userName,
        password:userPassword
      }

      loginUser(userData)

    })

async function loginUser (payload) {
      try {
          const resp = await fetch("http://localhost:8000/signin",{
            method:"POST",
            credentials: "include",
            redirect: 'follow',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(payload)
          })

          const data = await resp.json();
          console.log(`Data from login user =>${data}`);
          window.location.href="http://localhost:5502/FrontEnd/UserInfo/index.html";
        
      } catch (error) {
        console.log(error.message)
      }
    }