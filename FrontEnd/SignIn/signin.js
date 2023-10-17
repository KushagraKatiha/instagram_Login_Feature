const formSubmit = document.getElementById("submit")

    formSubmit.addEventListener("click",(event) => {
    //   event.preventDefault();
      
      const userName = document.getElementById("username").value
      const userPassword = document.getElementById("password").value
      const userData = {
        username:userName,
        password:userPassword
      }

      loginUser(userData)

    })


    const loginUser = async (payload) => {
      try {

          const resp = await fetch("http://localhost:8000/signin",{
            method:"POST",
            redirect: 'follow',
            headers:{"Content-Type": "multipart/form-data"},
            body:JSON.stringify(payload)
          })

          const data = await resp.json();
          console.log(data)
        //   window.location.href="http://localhost:5500/client/index.html";
        
      } catch (error) {
        console.log(error.message)
      }
    }