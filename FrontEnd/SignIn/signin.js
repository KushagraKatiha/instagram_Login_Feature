const formSubmit = document.getElementById("submit")

    formSubmit.addEventListener("click",(event) => {
      event.preventDefault();
      
      const userEmail = document.getElementById("email").value
      const userPassword = document.getElementById("password").value
      const userData = {
        email:userEmail,
        password:userPassword
      }

      loginUser(userData)

    })

async function loginUser (payload) {
      try {
          const resp = await fetch("http://localhost:8000/signin",{
            method:"POST",
            redirect: 'follow',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(payload)
          })

          const data = await resp.json();
          console.log(data);
          window.location.href="../UserInfo/index.html";
        
      } catch (error) {
        console.log(error.message)
      }
    }